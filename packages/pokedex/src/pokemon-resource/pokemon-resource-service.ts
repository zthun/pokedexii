import {
  IZDataRequest,
  IZDataSource,
  ZDataSearchFields,
  ZDataSourceStatic,
  ZDataSourceStaticOptionsBuilder
} from '@zthun/helpful-query';
import { IPokeApiPage } from 'src/poke-api/poke-api-page';

export interface IZPokemonResourceService<T extends object> extends IZDataSource<T> {
  /**
   * Gets information about a single resource.
   *
   * @param name -
   *        The name of the resource.
   *
   * @returns
   *        The resource with the given name.  Returns
   *        a rejected promise if no such resource exists.
   */
  get(name: string): Promise<T>;
}

export abstract class ZPokemonResourceService<T extends object> implements IZPokemonResourceService<T> {
  private _source: IZDataSource<T>;

  private get _all() {
    if (this._source == null) {
      const search = new ZDataSearchFields<T>(['name']);
      const options = new ZDataSourceStaticOptionsBuilder<T>().search(search).build();
      this._source = new ZDataSourceStatic(this._prefetch(), options);
    }

    return this._source;
  }

  public async count(request: IZDataRequest): Promise<number> {
    return this._all.count(request);
  }

  public async retrieve(request: IZDataRequest): Promise<T[]> {
    return this._all.retrieve(request);
  }

  public abstract get(name: string): Promise<T>;

  /**
   * Fetch the list of data for this resource.
   *
   * @returns
   *        The list of every resource.
   *
   */
  protected abstract fetch(): Promise<IPokeApiPage>;

  /**
   * Prefetches the list to cache it in memory.
   *
   * @returns
   *        A list of every item from the api resource.
   */
  private async _prefetch(): Promise<T[]> {
    const resources = await this.fetch();
    return await Promise.all(resources.results.map((r) => this.get(r.name)));
  }
}
