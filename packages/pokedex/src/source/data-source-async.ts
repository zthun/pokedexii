import { IZDataMatch } from './data-match';
import { IZDataRequest } from './data-request';
import { IZDataSource } from './data-source';
import { ZDataSourceStatic } from './data-source-static';

/**
 * Represents a data source that retrieves a full list of
 * data asynchronously
 */
export class ZDataSourceAsync<T> implements IZDataSource<T> {
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
