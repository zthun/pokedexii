import { ZCircusActBuilder, ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZPokedexSearchComponentModel } from './pokedex-search.cm';
import { ZPokemonCardComponentModel } from './pokemon-card.cm';

/**
 * Represents the component model for the pokedex list page.
 */
export class ZPokedexListPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokedexListPage-root';

  /**
   * Gets whether the page is currently loading.
   *
   * @returns
   *        True if a spinner is detected.  False otherwise.
   */
  public async loading(): Promise<boolean> {
    return this.driver.peek('.ZPokedexListPage-loading');
  }

  /**
   * Gets whether the page is currently in an error state.
   *
   * @returns
   *        True if an error is detected, false otherwise.
   */
  public async error(): Promise<boolean> {
    return this.driver.peek('.ZPokedexListPage-error');
  }

  /**
   * Gets the search text box.
   *
   * @returns
   *        The search text box.
   */
  public async search(): Promise<ZPokedexSearchComponentModel> {
    return ZCircusBy.first(this.driver, ZPokedexSearchComponentModel);
  }

  /**
   * Gets which page the list is currently on.
   *
   * @returns
   *        The page that the list is currently on.
   */
  public async page(): Promise<number> {
    const button = await this.driver.select('.MuiPaginationItem-root[aria-current="true"]');
    const page = await button.text();
    return +page;
  }

  /**
   * Gets the current page of pokemon cards.
   *
   * @returns
   *      The current page of pokemon cards.
   */
  public pokemon(): Promise<ZPokemonCardComponentModel[]>;
  /**
   * Gets a single pokemon card on the page.
   *
   * @param idOrName -
   *        The id or name of the pokemon to retrieve.
   *
   * @returns
   *        The card of the pokemon with the id or name.  Rejects
   *        if no such card exists.
   *
   */
  public pokemon(idOrName: number | string): Promise<ZPokemonCardComponentModel>;

  public async pokemon(idOrName?: number | string): Promise<ZPokemonCardComponentModel[] | ZPokemonCardComponentModel> {
    if (idOrName === undefined) {
      return ZCircusBy.all(this.driver, ZPokemonCardComponentModel);
    }

    const query = [
      `${ZPokemonCardComponentModel.Selector}[data-name="${idOrName}"]`,
      `${ZPokemonCardComponentModel.Selector}[data-id="${idOrName}"]`
    ].join(',');

    return ZCircusBy.css(this.driver, ZPokemonCardComponentModel, query);
  }

  private async _goToPage(aria: string) {
    const selector = `.MuiPaginationItem-root[aria-label="${aria}"]`;
    const [button] = await this.driver.query(selector);

    const disabled = await button?.disabled();

    if (disabled) {
      return await this.page();
    }

    const act = new ZCircusActBuilder().click().build();
    await button?.perform(act);
    await this.wait();
    return await this.page();
  }

  /**
   * Jumps to a specific page.
   *
   * @param page -
   *        The page number to jump to.
   *
   * @returns
   *        The page number you are on after the attempted
   *        jump.  If the jump cannot be made, then the current
   *        page is returned.
   */
  public async jump(page: number) {
    return this._goToPage(`Go to page ${page}`);
  }

  /**
   * Navigates to the next page.
   *
   * @returns
   *        The page the list is on after the attempted
   *        navigation.
   */
  public async next() {
    return this._goToPage('Go to next page');
  }

  /**
   * Navigates to the previous page.
   *
   * @returns
   *        The page the list is on after the attempted
   *        navigation.
   */
  public async prev() {
    return this._goToPage('Go to previous page');
  }

  /**
   * Waits for the list to finish loading.
   */
  public async wait() {
    await this.driver.wait(() => this.loading().then((l) => !l));
  }
}
