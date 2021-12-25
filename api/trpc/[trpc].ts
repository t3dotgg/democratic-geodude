import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";

const prisma = new PrismaClient();

const MAX_DEX_ID = 493;

export const getRandomPokemon: (notThisOne?: number) => number = (
  notThisOne
) => {
  const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (pokedexNumber !== notThisOne) return pokedexNumber;
  return getRandomPokemon(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId = getRandomPokemon();
  const secondId = getRandomPokemon(firstId);

  return [firstId, secondId];
};

type RouterContext = inferAsyncReturnType<typeof createContext>;

const cachedRouter = trpc.router<RouterContext>().query("public-results", {
  async resolve({ ctx }) {
    return await prisma.pokemon.findMany({
      orderBy: {
        VoteFor: { _count: "desc" },
      },
      select: {
        id: true,
        name: true,
        spriteUrl: true,
        _count: {
          select: {
            VoteFor: true,
            VoteAgainst: true,
          },
        },
      },
    });
  },
});

const mainRouter = trpc
  .router()
  .query("get-pokemon-pair", {
    async resolve() {
      const [first, second] = getOptionsForVote();

      const bothPokemon = await prisma.pokemon.findMany({
        where: { id: { in: [first, second] } },
      });

      if (bothPokemon.length !== 2)
        throw new Error("Failed to find two pokemon");

      return { firstPokemon: bothPokemon[0], secondPokemon: bothPokemon[1] };
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      });
      return { success: true, vote: voteInDb };
    },
  });

const appRouter = trpc
  .router<RouterContext>()
  .merge(cachedRouter)
  .merge(mainRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

const createContext = (opts: trpcNext.CreateNextContextOptions) => opts;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext as any,
  responseMeta({ ctx, paths, type, errors }) {
    // assuming you have all your public routes with the kewyord `public` in them
    const allPublic = paths && paths.every((path) => path.includes("public"));
    // checking that no procedures errored
    const allOk = errors.length === 0;
    // checking we're doing a query request
    const isQuery = type === "query";

    if (ctx?.res && allPublic && allOk && isQuery) {
      // cache request for 1 day
      const DAY_IN_SECONDS = 60 * 60 * 24;
      return {
        headers: {
          "cache-control": `s-maxage=${DAY_IN_SECONDS}, stale-while-revalidate=${DAY_IN_SECONDS}`,
        },
      };
    }
    return {};
  },
});
