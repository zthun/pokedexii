import { IZDataRequest } from './data-request';
import { paginate } from './data-results';
import { IZDataSource } from './data-source';

/**
 * Represents an in memory data source.
 *
 * This is very useful for testing and when you
 * need to cache a data set that you already have.
 */
export class ZDataSourceStatic<T> implements IZDataSource<T> {
  public constructor(private _data: T[]) {}

  public count(): Promise<number> {
    // TODO: filtering.
    const length = this._data.length;
    return Promise.resolve(length);
  }

  public retrieve(request: IZDataRequest): Promise<T[]> {
    // TODO: Sorting, Filtering
    const { page = 1, size = Infinity } = request;
    const result = paginate(this._data, page, size);
    return Promise.resolve(result);
  }
}
