import { ZCircusComponentModel } from '@zthun/cirque';
import { ZType } from '@zthun/pokedex';

export class ZPokemonTypeBadgeComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokemonTypeBadge-root';

  public type(): Promise<ZType> {
    return this.driver.attribute('data-name', ZType.Unknown);
  }
}
