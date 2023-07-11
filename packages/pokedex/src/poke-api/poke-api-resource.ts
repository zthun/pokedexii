import { firstDefined } from '@zthun/helpful-fn';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { last, split, trim, trimEnd } from 'lodash';

export const PokeApiUrl = 'https://pokeapi.co/api/v2';

export interface IPokeApiResource {
  url: string;
}

export interface IPokeApiNamedResource extends IPokeApiResource {
  name: string;
}

export function findId(resource: IPokeApiResource): number {
  let { url } = resource;
  url = trim(trimEnd(url, '/'));
  return +firstDefined('0', last(split(url, '/')));
}

export function createResource(resource: string, id: number): IPokeApiResource;
export function createResource(resource: string, id: number, name: string): IPokeApiNamedResource;
export function createResource(resource: string, id: number, name?: string): IPokeApiNamedResource | IPokeApiResource {
  const url = new ZUrlBuilder().parse(PokeApiUrl).append(resource).append(String(id)).build();
  return { name, url };
}
