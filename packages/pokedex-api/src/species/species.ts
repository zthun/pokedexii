import { IZSpecies, ZSpeciesBuilder } from '@zthun/pokedex';
import { ZPokedexCollection } from '../database/pokedex-database';
import { IPokeApiResource, ZPokeApiResource } from '../resource/resource';

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

export class ZPokeApiSpeciesBuilder {
  private _species: IPokeApiSpecies;

  public constructor() {
    this.from(new ZSpeciesBuilder().build());
  }

  public from(other: IZSpecies) {
    this._species = {
      base_happiness: other.happiness,
      capture_rate: other.capture,
      color: ZPokeApiResource.empty(),
      egg_groups: [],
      evolution_chain: ZPokeApiResource.toResource(ZPokedexCollection.EvolutionChain, other.evolution),
      evolves_from_species: ZPokeApiResource.empty(),
      flavor_text_entries: [],
      form_descriptions: [],
      forms_switchable: true,
      gender_rate: 1,
      genera: [],
      generation: ZPokeApiResource.empty(),
      growth_rate: ZPokeApiResource.empty(),
      habitat: ZPokeApiResource.empty(),
      has_gender_differences: false,
      hatch_counter: 0,
      id: other.id,
      is_baby: false,
      is_legendary: false,
      is_mythical: false,
      name: other.name,
      names: [],
      order: 0,
      pal_park_encounters: [],
      pokedex_numbers: [],
      shape: ZPokeApiResource.empty(),
      varieties: other.varieties.map((s) => ({
        is_default: other.main === s,
        pokemon: ZPokeApiResource.toResource(ZPokedexCollection.Pokemon, s)
      }))
    };
    return this;
  }

  public build() {
    return { ...this._species };
  }
}
