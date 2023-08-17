import { firstDefined } from '@zthun/helpful-fn';
import { last, split, trim, trimEnd } from 'lodash';
import { ZPokedexCollection } from '../database/pokedex-database';

export const PokeApiUrl = 'https://pokeapi.co/api/v2';

export interface IPokeApiResource {
  url: string;
  name?: string;
}

export interface IPokeApiResourcePage {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: IPokeApiResource[];
}

export abstract class ZPokeApiResource {
  public static findId(resource: IPokeApiResource): number {
    let { url } = resource;
    url = trim(trimEnd(url, '/'));
    return +firstDefined('0', last(split(url, '/')));
  }

  public static toPage(resources: IPokeApiResource[]) {
    return {
      count: resources.length,
      next: null,
      previous: null,
      results: resources
    };
  }

  public static toResource(
    collection: ZPokedexCollection,
    id: number | string,
    name?: string
  ): Required<IPokeApiResource> {
    return { url: `${PokeApiUrl}/${collection}/${id}`, name: name || String(id) };
  }

  public static empty(): IPokeApiResource {
    return { url: '' };
  }
}
