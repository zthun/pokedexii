export type CssClassInputParameter = string | [string, boolean] | null | undefined;

/**
 * Generates a css class string.
 *
 * Null, undefined, and keys of records that have falsy values will be ignored.
 *
 * @param root -
 *        The root class.
 * @param others -
 *        The remaining classes to check.
 *
 * @returns
 *        A string that joins the class objects that are truthy.
 */
export function cssClass(root: CssClassInputParameter, ...others: CssClassInputParameter[]) {
  return [root, ...others]
    .map((item) => (item instanceof Array ? (item[1] ? item[0] : null) : item))
    .filter((item) => item != null)
    .join(' ');
}
