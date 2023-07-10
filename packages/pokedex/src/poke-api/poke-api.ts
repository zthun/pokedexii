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
  private _pokedex = new Pokedex();

  private static _instance = new ZPokeApi();

  public static instance() {
    return ZPokeApi._instance;
  }

  private constructor() {}

  public pokemons(): Promise<IPokeApiPage> {
    return this._pokedex.getPokemonsList();
  }

  public pokemon(name: string): Promise<IPokeApiPokemon> {
    return this._pokedex.getPokemonByName(name);
  }

  public types(): Promise<IPokeApiPage> {
    return this._pokedex.getTypesList();
  }

  public type(name: string): Promise<IPokeApiType> {
    return this._pokedex.getTypeByName(name);
  }
}
