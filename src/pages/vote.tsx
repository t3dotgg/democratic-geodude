import { Component, Show } from "solid-js";
import {
  createTrpcMutation,
} from "../lib/trpc";
import { PokemonVote } from '../components/pokemon/vote';
import { store } from '../store';

const VotePage: Component = () => {
  const [data, { refetch }] = store.pokemonPair

  const { mutate } = createTrpcMutation("cast-vote");

  const voteForRoundest = (selected: number, against: number) => {
    mutate({ votedFor: selected, votedAgainst: against });
    refetch();
  };

  return (
    <>
      <div class="text-2xl text-center pt-8">Which Pokémon is Rounder?</div>
      <Show
        when={!data.loading && data()}
        fallback={<img src="/rings.svg" class="w-48" />}
      >
        {(response) => (
          <div class="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
            <PokemonVote
              pokemon={response.firstPokemon}
              vote={() =>
                voteForRoundest(
                  response.firstPokemon.id,
                  response.secondPokemon.id
                )
              }
              disabled={data.loading}
            />
            <div class="p-8 italic text-xl">{"or"}</div>
            <PokemonVote
              pokemon={response.secondPokemon}
              vote={() =>
                voteForRoundest(
                  response.secondPokemon.id,
                  response.firstPokemon.id
                )
              }
              disabled={data.loading}
            />
            <div class="p-2" />
          </div>
        )}
      </Show>
    </>
  );
};

export default VotePage;
