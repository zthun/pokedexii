import { IPokeApiResource } from './poke-api-resource';

interface IPokeApiSpeciesGenus {
  genus: string;
  language: IPokeApiResource;
}

interface IPokeApiSpeciesFlavorText {
  flavor_text: string;
  language: IPokeApiResource;
  version: IPokeApiResource;
}

interface IPokeApiSpeciesName {
  language: IPokeApiResource;
  name: string;
}

interface IPokeApiSpeciesPalParkEncounter {
  area: IPokeApiResource;
  base_score: 90;
  rate: 3;
}

interface IPokeApiSpeciesPokedexNumbers {
  entry_number: number;
  pokedex: IPokeApiResource;
}

interface IPokeApiSpeciesVariety {
  is_default: boolean;
  pokemon: IPokeApiResource;
}

export interface IPokeApiSpecies {
  base_happiness: number;
  capture_rate: number;
  color: IPokeApiResource;
  egg_groups: IPokeApiResource[];
  evolution_chain: IPokeApiResource;
  evolves_from_species: IPokeApiResource;
  flavor_text_entries: IPokeApiSpeciesFlavorText[];
  form_descriptions: unknown[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: IPokeApiSpeciesGenus[];
  generation: IPokeApiResource;
  growth_rate: IPokeApiResource;
  habitat: IPokeApiResource;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: IPokeApiSpeciesName[];
  order: number;
  pal_park_encounters: IPokeApiSpeciesPalParkEncounter[];
  pokedex_numbers: IPokeApiSpeciesPokedexNumbers[];
  shape: IPokeApiResource;
  varieties: IPokeApiSpeciesVariety[];
}
