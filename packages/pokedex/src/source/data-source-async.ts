import { IZDataRequest } from './data-request';
import { paginate } from './data-results';
import { IZDataSource } from './data-source';

/**
 * Represents a data source that retrieves a full list of
 * data asynchronously
 */
export class ZDataSourceAsync<T> implements IZDataSource<T> {
  public constructor(private _async: Promise<T[]>) {}

  public async count(): Promise<number> {
    // TODO: filtering.
    const data = await this._async;
    return data.length;
  }

  public async retrieve(request: IZDataRequest): Promise<T[]> {
    // TODO: Sorting, Filtering
    const { page = 1, size = Infinity } = request;
    const data = await this._async;
    return paginate(data, page, size);
  }
}
