import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZGridViewComponentModel } from '@zthun/fashion-boutique';
import { ZSpeciesCardComponentModel } from './species-card.cm';

/**
 * Represents the component model for the pokedex list page.
 */
export class ZPokemonListPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZSpeciesListPage-root';

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
  public async cards(): Promise<ZSpeciesCardComponentModel[]> {
    const grid = await this.grid();
    return ZCircusBy.all(grid.driver, ZSpeciesCardComponentModel);
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
  public async card(name: string): Promise<ZSpeciesCardComponentModel | null> {
    const grid = await this.grid();
    return ZCircusBy.optional(grid.driver, ZSpeciesCardComponentModel, name);
  }
}
