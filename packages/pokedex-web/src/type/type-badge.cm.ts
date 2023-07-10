import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZLineItemComponentModel } from '@zthun/fashion-boutique';
import { ZType } from '@zthun/pokedex';

export class ZTypeBadgeComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTypeBadge-root';

  public item(): Promise<ZLineItemComponentModel> {
    return ZCircusBy.first(this.driver, ZLineItemComponentModel);
  }

  public type(): Promise<ZType> {
    return this.driver.attribute('data-name', ZType.Unknown);
  }
}
