import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZGridViewComponentModel } from '@zthun/fashion-boutique';
import { ZPokemonCardComponentModel } from '../pokemon-card/pokemon-card.cm';

/**
 * Represents the component model for the pokedex list page.
 */
export class ZPokedexListPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokedexListPage-root';

  /**
   * Returns the root grid that contains the search and pagination.
   *
   * @returns
   *        The root grid view.
   */
  public grid(): Promise<ZGridViewComponentModel> {
    return Promise.resolve(new ZGridViewComponentModel(this.driver));
  }

  /**
   * Returns all cards on the current page.
   *
   * @returns
   *        The cards on the current page.
   */
  public async cards(): Promise<ZPokemonCardComponentModel[]> {
    const grid = await this.grid();
    return ZCircusBy.all(grid.driver, ZPokemonCardComponentModel);
  }

  /**
   * Returns a specific card for a named pokemon.
   *
   * @param name -
   *        The name of the card to retrieve.
   *
   * @returns
   *        The card that represents the current pokemon.
   */
  public async card(name: string): Promise<ZPokemonCardComponentModel | null> {
    const grid = await this.grid();
    return ZCircusBy.optional(grid.driver, ZPokemonCardComponentModel, name);
  }
}
