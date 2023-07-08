import { ZCircusComponentModel } from '@zthun/cirque';
import { ZPokemonType } from '@zthun/pokedex';

export class ZPokemonTypeBadgeComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokemonTypeBadge-root';

  public type(): Promise<ZPokemonType> {
    return this.driver.attribute('data-name', ZPokemonType.Unknown);
  }
}
