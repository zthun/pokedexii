import { ZCircusComponentModel } from '@zthun/cirque';
import { ZType } from '@zthun/pokedex';
import { ZResourceCardComponentModel } from '../resource/resource-card.cm';

export class ZTypeCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTypeCard-root';

  public asResourceCard(): ZResourceCardComponentModel {
    return new ZResourceCardComponentModel(this.driver);
  }

  public async type(): Promise<ZType> {
    await this.asResourceCard().load();
    return this.driver.attribute('data-name', ZType.Unknown);
  }
}
