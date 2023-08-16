import { firstDefined } from '@zthun/helpful-fn';
import { last, split, trim, trimEnd } from 'lodash';

export interface IPokeApiResource {
  url: string;
  name?: string;
}

export function findId(resource: IPokeApiResource): number {
  let { url } = resource;
  url = trim(trimEnd(url, '/'));
  return +firstDefined('0', last(split(url, '/')));
}
