import { IZDataMatch } from './data-match';
import { IZDataRequest } from './data-request';
import { IZDataSource } from './data-source';
import { ZDataSourceStatic } from './data-source-static';

/**
 * Represents a data source that retrieves a full list of
 * data asynchronously.
 *
 * This is similar to an @see ZDataSourceStatic implementation
 * and uses the same structure, but will unwrap the async
 * promise beforehand.
 */
export class ZDataSourceAsync<T> implements IZDataSource<T> {
  /**
   * Initializes a new instance of this object.
   *
   * @param _async -
   *        The asynchronous data that is being retrieved.
   * @param _search -
   *        The data match strategy to determine if items are to
   *        be included in a search.
   */
  public constructor(private _async: Promise<T[]>, private _search?: IZDataMatch<T, string>) {}

  public async count(request: IZDataRequest): Promise<number> {
    const data = await this._async;
    return new ZDataSourceStatic(data, this._search).count(request);
  }

  public async retrieve(request: IZDataRequest): Promise<T[]> {
    const data = await this._async;
    return new ZDataSourceStatic(data, this._search).retrieve(request);
  }
}
