import { createMutable } from "solid-js/store";
import { createTrpcQuery } from "./lib/trpc";
import { PokemonQueryResult} from './types';

const getPokemonsWithPercentage = () => {
  const [data, {refetch}] = createTrpcQuery('public-results');

  if(Array.isArray(data)) {
    const formatedPokemons = data?.map((pokemon) => ({
      ...pokemon,
      percentage: generateCountPercent(pokemon).toFixed(2)
    }));

    const sortedPokemon = formatedPokemons.sort((a, b) => {
      const difference =
        generateCountPercent(b) - generateCountPercent(a);

      if (difference === 0) {
        return b._count.VoteFor - a._count.VoteFor;
      }

      return difference;
    })

    return {
      ...sortedPokemon,
      loading: data.loading,
      refetch,
    };
  }
}


const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = pokemon._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};


export const store = createMutable({
  pokemonPair: createTrpcQuery('get-pokemon-pair'),
  pokemons: getPokemonsWithPercentage(),
});
