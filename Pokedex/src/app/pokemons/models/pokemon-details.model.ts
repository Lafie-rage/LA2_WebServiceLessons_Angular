/**
 * Object representing the data defining the details of an Item for the API.
 */
export interface PokemonDetails {
  id: number;
  name: string;
  description: string;
  height: number;
  weight: number;
  types: string[];
}

// Mapping Pokemon details to pokemon
/**
 * Object representing an item to display on a list.
 */
export type Pokemon = Pick<PokemonDetails, "id" | "name">
