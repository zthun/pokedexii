/* istanbul ignore file -- @preserve */

import { ZHttpRequestBuilder, ZHttpService } from '@zthun/webigail-http';
import { ZUrlBuilder } from '@zthun/webigail-url';
import localForage from 'localforage';
import { IPokeApiEvolutionChain } from './poke-api-evolution-chain';
import { IPokeApiPage } from './poke-api-page';
import { IPokeApiPokemon } from './poke-api-pokemon';
import { IPokeApiSpecies } from './poke-api-species';
import { IPokeApiType } from './poke-api-type';

export interface IPokeApi {
  pokemonList(): Promise<IPokeApiPage>;
  pokemon(name: string): Promise<IPokeApiPokemon>;
  typeList(): Promise<IPokeApiPage>;
  type(name: string): Promise<IPokeApiType>;
  speciesList(): Promise<IPokeApiPage>;
  species(name: string): Promise<IPokeApiSpecies>;
  evolutionList(): Promise<IPokeApiPage>;
  evolution(name: string): Promise<IPokeApiEvolutionChain>;
}

export class ZPokeApi implements IPokeApi {
  private static readonly DATABASE = 'https://pokeapi.co/api/v2';
  private _flightMap = new Map<string, Promise<any>>();
  private _http = new ZHttpService();

  private static _instance = new ZPokeApi();

  public static instance() {
    localForage.config({ name: ZPokeApi.DATABASE });
    return ZPokeApi._instance;
  }

  private constructor() {}

  private _resourceUrl(resource: string, name?: string) {
    const root = new ZUrlBuilder('https', 'pokeapi.co').append('api').append('v2').append(resource);
    return name == null ? root.param('limit', '10000').build() : root.append(name).build();
  }

  private async _resource<T>(resource: string, name?: string): Promise<T> {
    const url = this._resourceUrl(resource, name);
    const request = new ZHttpRequestBuilder().url(url).get().timeout(10000).build();

    const cached = await localForage.getItem<T>(url);

    if (cached == null) {
      if (!this._flightMap.has(url)) {
        this._flightMap.set(url, this._http.request(request))!;
      }

      const response = await this._flightMap.get(url)!;
      const { data } = response;
      await localForage.setItem<T>(url, data);
      this._flightMap.delete(url);
      return data;
    }

    return cached;
  }

  public pokemonList(): Promise<IPokeApiPage> {
    return this._resource('pokemon');
  }

  public pokemon(name: string): Promise<IPokeApiPokemon> {
    return this._resource('pokemon', name);
  }

  public typeList(): Promise<IPokeApiPage> {
    return this._resource('type');
  }

  public type(name: string): Promise<IPokeApiType> {
    return this._resource('type', name);
  }

  public speciesList(): Promise<IPokeApiPage> {
    return this._resource('pokemon-species');
  }

  public species(name: string): Promise<IPokeApiSpecies> {
    return this._resource('pokemon-species', name);
  }

  public evolutionList(): Promise<IPokeApiPage> {
    return this._resource('evolution-chain');
  }

  public evolution(name: string): Promise<IPokeApiEvolutionChain> {
    // Note - The name here is actually a number.
    return this._resource('evolution-chain', name);
  }
}
