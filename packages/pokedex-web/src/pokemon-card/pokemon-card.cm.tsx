import { ZCircusActBuilder, ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZPokemonTypeBadgeComponentModel } from 'src/pokemon-type-badge/pokemon-type-badge.cm';

/**
 * Represents the component model for a Pokemon card.
 */
export class ZPokemonCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokemonCard-root';

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
  public types(): Promise<ZPokemonTypeBadgeComponentModel[]> {
    return ZCircusBy.all(this.driver, ZPokemonTypeBadgeComponentModel);
  }

  /**
   * Clicks the card.
   */
  public async click() {
    const action = new ZCircusActBuilder().click().build();
    await this.driver.perform(action);
  }
}
