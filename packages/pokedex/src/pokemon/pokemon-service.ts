import { firstDefined } from '@zthun/helpful-fn';
import {
  IZDataRequest,
  IZDataSource,
  ZDataSearchFields,
  ZDataSourceStatic,
  ZDataSourceStaticOptionsBuilder
} from '@zthun/helpful-query';
import { IPokeApi, ZPokeApi } from '../poke-api/poke-api';
import { IZPokemon, ZPokemonBuilder } from './pokemon';
import { ZPokemonType } from './pokemon-type';

/**
 * Represents a service that retrieves data from the pokemon api.
 */
export interface IZPokemonService extends IZDataSource<IZPokemon> {
  /**
   * Gets the total count of pokemon given a filter.
   *
   * @param request -
   *        The request query.
   *
   * @returns
   *        The total number of pokemon across pages that
   *        would be returned from list if the request was
   *        made with the first page and an infinite page
   *        size.
   */
  count(request: IZDataRequest): Promise<number>;

  /**
   * Gets a list of pokemon.
   *
   * @param request -
   *        The request query.
   *
   * @returns
   *        A page of pokemon data that conforms to the given
   *        request query.
   */
  retrieve(request: IZDataRequest): Promise<IZPokemon[]>;

  /**
   * Gets information about a single pokemon.
   *
   * @param name -
   *        The name of the pokemon.
   *
   * @returns
   *        The pokemon with the given name.  Returns
   *        a rejected promise if no such pokemon exists.
   */
  get(name: string): Promise<IZPokemon>;
}

/**
 * Represents an implementation of an pokemon service that
 * uses the pokeapi.
 */
export class ZPokemonServiceApi implements IZPokemonService {
  private _all: IZDataSource<IZPokemon>;

  /**
   * Initializes a new instance of this object.
   *
   * @param _api -
   *        The _api service that will be responsible for
   *        querying out to the pokeapi endpoints.
   */
  public constructor(private _api: IPokeApi) {
    const search = new ZDataSearchFields<IZPokemon>(['name']);
    const options = new ZDataSourceStaticOptionsBuilder<IZPokemon>().search(search).build();
    this._all = new ZDataSourceStatic(this._prefetch(), options);
  }

  public async count(request: IZDataRequest): Promise<number> {
    return this._all.count(request);
  }

  public async retrieve(request: IZDataRequest): Promise<IZPokemon[]> {
    return this._all.retrieve(request);
  }

  public async get(name: string): Promise<IZPokemon> {
    const p = await this._api.pokemon(name);

    const official = p.sprites?.other['official-artwork'];
    const artwork = firstDefined(
      '',
      official?.front_default,
      official?.front_female,
      official?.front_shiny,
      official?.front_shiny_female
    );

    const types = p.types.map((t) => t.type.name as ZPokemonType);
    return new ZPokemonBuilder().who(p.id, p.name).artwork(artwork).types(types).build();
  }

  /**
   * Prefetches the pokemon list to cache it in memory.
   *
   * This reduces the load on the pokeapi as requested in their documentation.
   * There are currently around 1200 pokemon so this list is very finite.
   *
   * @returns
   *        A list of every pokemon from the pokemon api.
   */
  private async _prefetch(): Promise<IZPokemon[]> {
    const resources = await this._api.pokemons();
    return await Promise.all(resources.results.map((r) => this.get(r.name)));
  }
}

/**
 * Creates the default instance of the pokemon service.
 */
export function createPokemonService(): IZPokemonService {
  return new ZPokemonServiceApi(new ZPokeApi());
}
