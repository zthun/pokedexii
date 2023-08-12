/* istanbul ignore file -- @preserve */

import { ZDatabaseOptionsBuilder } from '@zthun/dalmart-db';
import { ZDatabaseForage } from '@zthun/dalmart-forage';
import { ZHttpRequestBuilder, ZHttpService } from '@zthun/webigail-http';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { IPokeApiEvolutionChain } from './poke-api-evolution-chain';
import { IPokeApiPage } from './poke-api-page';
import { IPokeApiPokemon } from './poke-api-pokemon';
import { PokeApiUrl } from './poke-api-resource';
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
  private _flightMap = new Map<string, Promise<any>>();
  private _http = new ZHttpService();
  private _forage = new ZDatabaseForage(new ZDatabaseOptionsBuilder().database(PokeApiUrl).build());

  private static _instance = new ZPokeApi();

  public static instance() {
    return ZPokeApi._instance;
  }

  private constructor() {}

  private _resourceUrl(resource: string, name?: string) {
    const root = new ZUrlBuilder().parse(PokeApiUrl).append(resource);
    return name == null ? root.param('limit', '10000').build() : root.append(name).build();
  }

  private async _resource<T>(resource: string, name?: string): Promise<T> {
    const url = this._resourceUrl(resource, name);
    const request = new ZHttpRequestBuilder().url(url).get().timeout(10000).build();

    const cached = await this._forage.read<T>(url);

    if (cached == null) {
      if (!this._flightMap.has(url)) {
        this._flightMap.set(url, this._http.request(request))!;
      }

      const response = await this._flightMap.get(url)!;
      const { data } = response;
      await this._forage.upsert<T>(url, data);
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

  public async typeList(): Promise<IPokeApiPage> {
    // Note:  Shadow and unknown aren't actually types
    // so we can just exclude them for now until some
    // game actually uses them.  I'm pretty sure these
    // are placeholders.
    const exclude = ['shadow', 'unknown'];
    const page = await this._resource<IPokeApiPage>('type');
    page.results = page.results.filter((t) => exclude.indexOf(t.name) < 0);
    return page;
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
