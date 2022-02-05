export interface PokemonDetails {
  id: number;
  name: string;
  description: string;
  height: number;
  weight: number;
  types: string[];
}

// Mapping Pokemon details to pokemon
export type Pokemon = Pick<PokemonDetails, "id" | "name">
