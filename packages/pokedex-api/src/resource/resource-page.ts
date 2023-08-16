import { IPokeApiResource } from './resource';

export interface IPokeApiResourcePage {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: IPokeApiResource[];
}
