import { IZDataRequest } from './data-request';

export interface IZDataSource<T> {
  count(request: IZDataRequest): Promise<number>;
  retrieve(request: IZDataRequest): Promise<T[]>;
}
