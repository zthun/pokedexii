import { ZCircusActBuilder, ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZPokemonCardComponentModel } from './pokemon-card.cm';

/**
 * Represents the component model for the pokedex list page.
 */
export class ZPokedexListPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokedexListPage-root';

  public async loading(): Promise<boolean> {
    return this.driver.peek('.ZPokedexListPage-loading');
  }

  public async error(): Promise<boolean> {
    return this.driver.peek('.ZPokedexListPage-error');
  }

  public async page(): Promise<number> {
    const button = await this.driver.select('.MuiPaginationItem-root[aria-current="true"]');
    const page = await button.text();
    return +page;
  }

  public pokemon(): Promise<ZPokemonCardComponentModel[]>;
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
    const act = new ZCircusActBuilder().click().build();
    await button?.perform(act);
    await this.wait();
    return await this.page();
  }

  public async jump(page: number) {
    return this._goToPage(`Go to page ${page}`);
  }

  public async next() {
    return this._goToPage('Go to next page');
  }

  public async prev() {
    return this._goToPage('Go to previous page');
  }

  public async wait() {
    await this.driver.wait(() => this.loading().then((l) => !l));
  }
}
