
import { PokemonFromServer } from '../../types';
import { Component } from "solid-js";
  
export const PokemonVote: Component<{
  pokemon: PokemonFromServer;
  vote: () => void;
  disabled: boolean;
}> = (props) => {
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
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => props.vote()}
            disabled={props.disabled}
          >
            Rounder
          </button>
        </div>
      );
};

export default PokemonVote;