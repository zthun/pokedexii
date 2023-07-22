import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZBubbleComponentModel, ZSuspenseComponentModel } from '@zthun/fashion-boutique';

export class ZEvolutionNodeBubbleComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZEvolutionNodeBubble-root';

  public species(): Promise<string> {
    return this.driver.attribute('data-species', 'missingno');
  }

  public async bubble(): Promise<ZBubbleComponentModel> {
    return ZCircusBy.first(this.driver, ZBubbleComponentModel);
  }

  public async name(): Promise<string> {
    const parent = await this.driver.select('.ZEvolutionNodeBubble-name');
    return parent.text();
  }

  public async load(): Promise<void> {
    await ZSuspenseComponentModel.load(this.driver);
  }
}
