import { inferQueryResponse } from "./lib/trpc";

export type PokemonFromServer = inferQueryResponse<"get-pokemon-pair">["firstPokemon"];
export type PokemonQueryResult = inferQueryResponse<"public-results">;