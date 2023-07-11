import {
  IZDataRequest,
  IZDataSource,
  ZDataSearchFields,
  ZDataSourceStatic,
  ZDataSourceStaticOptionsBuilder
} from '@zthun/helpful-query';
import { IPokeApiConverter } from '../poke-api/poke-api-converter';
import { IPokeApiRetrieval } from '../poke-api/poke-api-retrieval';

export interface IZResourceService<T extends object> extends IZDataSource<T> {
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

export class ZResourceService<P, T extends object> implements IZResourceService<T> {
  private _source: IZDataSource<T>;

  private get _all() {
    if (this._source == null) {
      const search = new ZDataSearchFields<T>(['name', 'id']);
      const options = new ZDataSourceStaticOptionsBuilder<T>().search(search).build();
      this._source = new ZDataSourceStatic(this._prefetch(), options);
    }

    return this._source;
  }

  public constructor(private _retriever: IPokeApiRetrieval<P>, private _converter: IPokeApiConverter<P, T>) {}

  public async count(request: IZDataRequest): Promise<number> {
    return this._all.count(request);
  }

  public async retrieve(request: IZDataRequest): Promise<T[]> {
    return this._all.retrieve(request);
  }

  public async get(name: string): Promise<T> {
    const p = await this._retriever.get(name);
    return this._converter.convert(p);
  }

  /**
   * Prefetches the list to cache it in memory.
   *
   * @returns
   *        A list of every item from the api resource.
   */
  private async _prefetch(): Promise<T[]> {
    const resources = await this._retriever.list();
    return await Promise.all(resources.results.map((r) => this.get(r.name)));
  }
}