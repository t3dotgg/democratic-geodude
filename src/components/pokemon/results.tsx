import { Component } from "solid-js";
import { inferQueryResponse } from "../../lib/trpc";
import { PokemonQueryResult } from '../../types';

const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = pokemon._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

export const PokemonResult: Component<{ pokemon: PokemonQueryResult[number] }> = ({
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

export default PokemonResult;