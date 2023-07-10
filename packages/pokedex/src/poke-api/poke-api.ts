/* istanbul ignore file -- @preserve */

import { IPokeApiPage } from './poke-api-page';
import { IPokeApiPokemon } from './poke-api-pokemon';

import { Pokedex } from 'pokeapi-js-wrapper';
import { IPokeApiType } from './poke-api-type';

export interface IPokeApi {
  pokemons(): Promise<IPokeApiPage>;
  pokemon(name: string): Promise<IPokeApiPokemon>;
  types(): Promise<IPokeApiPage>;
  type(name: string): Promise<IPokeApiType>;
}

export class ZPokeApi implements IPokeApi {
  private _types = new Map<string, Promise<IPokeApiType>>();
  private _pokemon = new Map<string, Promise<IPokeApiPokemon>>();

  private _pokedex = new Pokedex();

  private static _instance = new ZPokeApi();

  public static instance() {
    return ZPokeApi._instance;
  }

  private constructor() {}

  private _getFromMap<T>(name: string, map: Map<string, Promise<T>>, getFn: (name: string) => Promise<T>) {
    if (!map.has(name)) {
      map.set(name, getFn(name));
    }
    return map.get(name)!;
  }

  public pokemons(): Promise<IPokeApiPage> {
    return this._pokedex.getPokemonsList();
  }

  public pokemon(name: string): Promise<IPokeApiPokemon> {
    return this._getFromMap(name, this._pokemon, this._pokedex.getPokemonByName.bind(this._pokedex));
  }

  public types(): Promise<IPokeApiPage> {
    return this._pokedex.getTypesList();
  }

  public type(name: string): Promise<IPokeApiType> {
    return this._getFromMap(name, this._types, this._pokedex.getTypeByName.bind(this._pokedex));
  }
}
