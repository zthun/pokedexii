import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZResourceCardComponentModel } from '../resource/resource-card.cm';
import { ZEvolutionNodeListComponentModel } from './evolution-node-list.cm';

export class ZEvolutionChainCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZEvolutionChainCard-root';

  public asResourceCard(): ZResourceCardComponentModel {
    return new ZResourceCardComponentModel(this.driver);
  }

  public nodes(): Promise<ZEvolutionNodeListComponentModel[]> {
    return ZCircusBy.all(this.driver, ZEvolutionNodeListComponentModel);
  }
}
