import { ZCircusComponentModel } from '@zthun/cirque';
import { ZType } from '@zthun/pokedex';

export class ZTypeBadgeComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTypeBadge-root';

  public type(): Promise<ZType> {
    return this.driver.attribute('data-name', ZType.Unknown);
  }
}
