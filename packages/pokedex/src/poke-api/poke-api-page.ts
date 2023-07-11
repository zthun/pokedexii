import { IZPokedexNamedResource } from '../pokedex-resource/pokedex-named-resource';
import { IPokeApiResource } from './poke-api-resource';

export interface IPokeApiPage {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: IPokeApiResource[];
}

export function createApiPage<T extends IZPokedexNamedResource>(resources: T[]): IPokeApiPage {
  return {
    count: resources.length,
    next: null,
    previous: null,
    results: resources.map((r) => ({ name: r.name, url: '' }))
  };
}
