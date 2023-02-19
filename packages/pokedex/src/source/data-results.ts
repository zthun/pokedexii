import { chunk } from 'lodash';

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
