import { IZDataMatch } from './data-match';
import { ZDataMatchAlways } from './data-match-always';
import { IZDataRequest } from './data-request';
import { paginate, search } from './data-results';
import { IZDataSource } from './data-source';

/**
 * Represents an in memory data source.
 *
 * This is very useful for testing and when you
 * need to cache a data set that you already have.
 */
export class ZDataSourceStatic<T> implements IZDataSource<T> {
  /**
   * Initializes a new instance of this object.
   *
   * @param _data -
   *        The static data to search, sort, filter, and paginate.
   * @param _search -
   *        The search matching strategy.  If this is undefined, then
   *        all data will match.
   */
  public constructor(private _data: T[], private _search: IZDataMatch<T, string> = new ZDataMatchAlways()) {}

  public count(request: IZDataRequest): Promise<number> {
    const { search: query } = request;
    let data = this._data;
    data = search(data, query, this._search);
    return Promise.resolve(data.length);
  }

  public retrieve(request: IZDataRequest): Promise<T[]> {
    const { page = 1, size = Infinity, search: query } = request;
    let data = this._data;
    data = search(data, query, this._search);
    data = paginate(data, page, size);
    return Promise.resolve(data);
  }
}
