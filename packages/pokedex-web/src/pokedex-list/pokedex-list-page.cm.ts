import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
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

  /**
   * Waits for the list to load.
   */
  public async wait() {
    await this.driver.wait(() => this.loading().then((l) => !l));
  }
}
