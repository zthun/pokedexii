import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';
import { IZPokemon, ZPokemonBuilder } from '@zthun/pokedex';

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
  public async who(): Promise<IZPokemon> {
    const name = await this.driver.attribute('data-name', 'missing_no');
    const id = await this.driver.attribute('data-id', '-1');
    return new ZPokemonBuilder().who(+id, name).build();
  }

  /**
   * Clicks the card.
   */
  public async click() {
    const action = new ZCircusActBuilder().click().build();
    await this.driver.perform(action);
  }
}
