import { IPokeApiNamedResource, IPokeApiResource } from './poke-api-resource';

interface IPokeApiSpeciesGenus {
  genus: string;
  language: IPokeApiNamedResource;
}

interface IPokeApiSpeciesFlavorText {
  flavor_text: string;
  language: IPokeApiNamedResource;
  version: IPokeApiNamedResource;
}

interface IPokeApiSpeciesName {
  language: IPokeApiNamedResource;
  name: string;
}

interface IPokeApiSpeciesPalParkEncounter {
  area: IPokeApiNamedResource;
  base_score: 90;
  rate: 3;
}

interface IPokeApiSpeciesPokedexNumbers {
  entry_number: number;
  pokedex: IPokeApiNamedResource;
}

interface IPokeApiSpeciesVariety {
  is_default: boolean;
  pokemon: IPokeApiNamedResource;
}

export interface IPokeApiSpecies {
  base_happiness: number;
  capture_rate: number;
  color: IPokeApiNamedResource;
  egg_groups: IPokeApiNamedResource[];
  evolution_chain: IPokeApiResource;
  evolves_from_species: IPokeApiNamedResource;
  flavor_text_entries: IPokeApiSpeciesFlavorText[];
  form_descriptions: unknown[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: IPokeApiSpeciesGenus[];
  generation: IPokeApiNamedResource;
  growth_rate: IPokeApiNamedResource;
  habitat: IPokeApiNamedResource;
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
  shape: IPokeApiNamedResource;
  varieties: IPokeApiSpeciesVariety[];
}
