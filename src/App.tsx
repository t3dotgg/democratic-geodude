import styles from "./App.module.css";

import type { Component } from "solid-js";
import { createTrpcQuery, inferQueryResponse } from "./lib/trpc";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

type PokemonFromServer = inferQueryResponse<"get-pokemon-pair">["firstPokemon"];

const PokemonListing = (props: {
  pokemon: PokemonFromServer;
  vote: () => void;
  disabled: boolean;
}) => {
  return (
    <div
      class={`flex flex-col items-center transition-opacity ${
        props.disabled && "opacity-0"
      }`}
    >
      <div class="text-xl text-center capitalize mt-[-0.5rem]">
        {props.pokemon.name}
      </div>
      <img
        src={props.pokemon.spriteUrl}
        width={256}
        height={256}
        class="animate-fade-in"
      />
      <button
        class={btn}
        onClick={() => props.vote()}
        disabled={props.disabled}
      >
        Rounder
      </button>
    </div>
  );
};

const App: Component = () => {
  const [data] = createTrpcQuery("get-pokemon-pair");

  const voteForRoundest = (id: number) => {
    return null;
  };

  const fetchingNext = false;

  return (
    <div class="h-screen w-screen flex flex-col justify-between items-center relative">
      <div class="text-2xl text-center pt-8">Which Pokémon is Rounder?</div>
      {data() && (
        <div class="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
          <PokemonListing
            pokemon={data()!.firstPokemon}
            vote={() => voteForRoundest(data()!.firstPokemon.id)}
            disabled={fetchingNext}
          />
          <div class="p-8 italic text-xl">{"or"}</div>
          <PokemonListing
            pokemon={data()!.secondPokemon}
            vote={() => voteForRoundest(data()!.secondPokemon.id)}
            disabled={fetchingNext}
          />
          <div class="p-2" />
        </div>
      )}
      {!data() && <img src="/rings.svg" class="w-48" />}
      <div class="w-full text-xl text-center pb-2">
        <a href="https://twitter.com/t3dotgg">Twitter</a>
        <span class="p-4">{"-"}</span>
        <a href="/results">Results</a>
        <span class="p-4">{"-"}</span>
        <a href="/about">About</a>
      </div>
    </div>
  );
};

export default App;
