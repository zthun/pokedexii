import { ZCircusActBuilder, ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZSuspenseComponentModel } from '@zthun/fashion-boutique';
import { ZTypeBadgeComponentModel } from '../type/type-badge.cm';

/**
 * Represents the component model for a Pokemon card.
 */
export class ZPokemonCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZSpeciesCard-root';

  /**
   * Gets the name of the pokemon.
   *
   * @returns
   *        The name of the pokemon.
   */
  public async name(): Promise<string> {
    return await this.driver.attribute('data-name', 'missing_no');
  }

  /**
   * Gets the badge types on the card.
   *
   * @returns
   *        The badge types on the card.
   */
  public types(): Promise<ZTypeBadgeComponentModel[]> {
    return ZCircusBy.all(this.driver, ZTypeBadgeComponentModel);
  }

  /**
   * Clicks the card.
   */
  public async click() {
    const action = new ZCircusActBuilder().click().build();
    await this.driver.perform(action);
  }

  /**
   * Waits for loading on the card to complete.
   */
  public async load() {
    await ZSuspenseComponentModel.load(this.driver);
  }
}
