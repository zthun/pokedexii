import { IPokeApiResource } from './poke-api-resource';

export interface IPokeApiPage {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: IPokeApiResource[];
}
