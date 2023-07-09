import { IPokeApiPage } from './poke-api-page';

export interface IPokeApiRetrieval<P> {
  list(): Promise<IPokeApiPage>;
  get(name: string): Promise<P>;
}
