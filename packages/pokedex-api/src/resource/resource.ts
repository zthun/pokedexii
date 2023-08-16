import { firstDefined } from '@zthun/helpful-fn';
import { last, split, trim, trimEnd } from 'lodash';

export const PokeApiUrl = 'https://pokeapi.co/api/v2';

export interface IPokeApiResource {
  url: string;
  name?: string;
}

export function findId(resource: IPokeApiResource): number {
  let { url } = resource;
  url = trim(trimEnd(url, '/'));
  return +firstDefined('0', last(split(url, '/')));
}
