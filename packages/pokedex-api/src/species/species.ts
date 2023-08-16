import { IZSpecies } from '@zthun/pokedex';
import { IPokeApiResource } from '../resource/resource';

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

export function createPokeApiSpeciesFrom(species: IZSpecies) {
  return {
    base_happiness: species.happiness,
    capture_rate: species.capture,
    color: { name: 'blue', url: '' },
    egg_groups: [],
    evolution_chain: { url: `https://pokeapi.co/evolution-chain/${species.evolution}` },
    evolves_from_species: { name: '', url: '' },
    flavor_text_entries: [],
    form_descriptions: [],
    forms_switchable: true,
    gender_rate: 1,
    genera: [],
    generation: { name: '', url: '' },
    growth_rate: { name: '', url: '' },
    habitat: { name: '', url: '' },
    has_gender_differences: false,
    hatch_counter: 0,
    id: species.id,
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    name: species.name,
    names: [],
    order: 0,
    pal_park_encounters: [],
    pokedex_numbers: [],
    shape: { name: '', url: '' },
    varieties: species.varieties.map((s) => ({ is_default: species.main === s, pokemon: { name: s, url: '' } }))
  };
}
