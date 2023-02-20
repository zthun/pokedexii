import { IZDataRequest } from './data-request';

/**
 * A representation of how to retrieve data from a given system
 * or location.
 */
export interface IZDataSource<T> {
  /**
   * Retrieves the total count of data items before pagination.
   *
   * @param request -
   *        The data request being made.  The page and size fields
   *        are ignored in this instance.
   *
   * @returns
   *        The total number of items across pages that the request
   *        data set will represent.
   */
  count(request: IZDataRequest): Promise<number>;

  /**
   * Retrieves a single page of data.
   *
   * @param request -
   *        The data request that contains the sorting, filtering,
   *        search, and pagination info to construct a data view.
   *
   * @returns
   *        A single page of data elements.
   */
  retrieve(request: IZDataRequest): Promise<T[]>;
}
