import { Component, For, Show } from "solid-js";
import { createTrpcQuery, inferQueryResponse } from "../lib/trpc";

type PokemonQueryResult = inferQueryResponse<"public-results">;
const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = pokemon._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const PokemonListing: Component<{ pokemon: PokemonQueryResult[number] }> = ({
  pokemon,
}) => {
  return (
    <div class="flex border-b p-2 items-center justify-between">
      <div class="flex items-center">
        <img src={pokemon.spriteUrl} width={64} height={64} />
        <div class="capitalize">{pokemon.name}</div>
      </div>
      <div class="pr-4">{generateCountPercent(pokemon).toFixed(2) + "%"}</div>
    </div>
  );
};

const ResultsPage: Component = () => {
  const [data] = createTrpcQuery("public-results");
  return (
    <div class="flex flex-col items-center">
      <h2 class="text-2xl p-4">Results</h2>
      <Show
        when={!data.loading && data()}
        fallback={<img src="/rings.svg" class="w-48" />}
      >
        {(pokemon) => (
          <div class="flex flex-col w-full max-w-2xl border">
            <For
              each={pokemon.sort((a, b) => {
                const difference =
                  generateCountPercent(b) - generateCountPercent(a);

                if (difference === 0) {
                  return b._count.VoteFor - a._count.VoteFor;
                }

                return difference;
              })}
            >
              {(currentMon) => <PokemonListing pokemon={currentMon} />}
            </For>
          </div>
        )}
      </Show>
    </div>
  );
};

export default ResultsPage;
