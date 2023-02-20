import { chunk } from 'lodash';
import { IZDataMatch } from './data-match';
import { ZDataMatchOptional } from './data-match-optional';

/**
 * Takes a list of data and paginates it in memory.
 *
 * @param data -
 *        The data to paginate.
 * @param page -
 *        The page number to retrieve.
 * @param size -
 *        The size of a single page
 *
 * @returns
 *        The subset page of data that was offset and limited to.  If
 *        page goes beyond the last page, then the result set should be empty.
 *        If the page is less than 1, then the first page will be used.
 *        If size is 0, then an empty page will be returned.
 */
export function paginate<T>(data: T[], page: number, size: number) {
  if (size === Infinity) {
    return page <= 1 ? data : [];
  }

  const _page = Math.max(0, page - 1);

  const pages = chunk(data, size);
  return pages[_page] || [];
}

/**
 * Invokes a search operation on the data and filters out the data that does not match.
 *
 * @param data -
 *        The data to search.
 * @param query -
 *        The query search string.
 * @param match -
 *        The match operation that determines if data should be included.
 *
 * @returns
 *        The data list that passes the filter match given the query string.
 */
export function search<T>(data: T[], query: string | undefined | null, match: IZDataMatch<T, string>) {
  const _match = new ZDataMatchOptional<T, string>(match);
  return data.filter((data) => _match.match(data, query));
}
