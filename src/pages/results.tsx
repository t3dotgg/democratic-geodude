import { Component, For, Show } from "solid-js";
import { store } from '../store';
import { PokemonResult } from '../components/pokemon/results';

const ResultsPage: Component = () => {
  return (
    <div class="flex flex-col items-center">
      <h2 class="text-2xl p-4">Results</h2>
      <Show
        when={!store.pokemons?.loading && store.pokemons}
        fallback={<img src="/rings.svg" class="w-48" />}
      >
        {(pokemon) => (
          <div class="flex flex-col w-full max-w-2xl border">
            <For
              each={pokemon}
            >
              {(currentMon) => <PokemonResult pokemon={currentMon} />}
            </For>
          </div>
        )}
      </Show>
    </div>
  );
};

export default ResultsPage;
