import { ZCircusComponentModel } from '@zthun/cirque';
import { ZSuspenseComponentModel } from '@zthun/fashion-boutique';

export class ZEvolutionNodeBubbleComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZEvolutionNodeBubble-root';

  public species(): Promise<string> {
    return this.driver.attribute('data-species', 'missingno');
  }

  public async name(): Promise<string> {
    const parent = await this.driver.select('.ZEvolutionNodeBubble-name');
    return parent.text();
  }

  public async load(): Promise<void> {
    await ZSuspenseComponentModel.load(this.driver);
  }
}
