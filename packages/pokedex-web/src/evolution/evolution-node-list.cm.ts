import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZCarouselComponentModel } from '@zthun/fashion-boutique';
import { ZEvolutionNodeBubbleComponentModel } from './evolution-node-bubble.cm';

export class ZEvolutionNodeListComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZEvolutionNodeList-root';

  public carousel(): Promise<ZCarouselComponentModel> {
    return Promise.resolve(new ZCarouselComponentModel(this.driver));
  }

  public current(): Promise<ZEvolutionNodeBubbleComponentModel> {
    return ZCircusBy.first(this.driver, ZEvolutionNodeBubbleComponentModel);
  }
}
