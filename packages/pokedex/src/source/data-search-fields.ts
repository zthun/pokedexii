import { get } from 'lodash';
import { IZDataMatch } from './data-match';

/**
 * Represents a data match where the data qualifies if any fields contain the search text.
 */
export class ZDataSearchFields<TData extends object> implements IZDataMatch<TData, string> {
  /**
   * Initializes a new instance of this object.
   *
   * @param fields -
   *        The fields to match.
   */
  public constructor(private _fields?: string[]) {}

  public match(data: TData, filter: string): boolean {
    const _fields = this._fields || Object.keys(data);
    const _filter = filter.toUpperCase();

    return _fields.some((field) => {
      const value = `${get(data, field) || ''}`.toUpperCase();
      return value.indexOf(_filter) >= 0;
    });
  }
}
