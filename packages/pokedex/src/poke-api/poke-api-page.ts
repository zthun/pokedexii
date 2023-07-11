import { IZPokedexNamedResource } from '../resource/resource';
import { IPokeApiNamedResource } from './poke-api-resource';

export interface IPokeApiPage {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: IPokeApiNamedResource[];
}

export function createApiPage<T extends IZPokedexNamedResource>(resources: T[]): IPokeApiPage {
  return {
    count: resources.length,
    next: null,
    previous: null,
    results: resources.map((r) => ({ name: r.name, url: '' }))
  };
}
