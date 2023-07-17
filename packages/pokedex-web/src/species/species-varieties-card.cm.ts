import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZButtonComponentModel } from '@zthun/fashion-boutique';
import { ZResourceCardComponentModel } from '../resource/resource-card.cm';

export class ZSpeciesVarietiesCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZSpeciesVarietiesCard-root';

  public species(): Promise<string> {
    return this.driver.attribute('data-name', 'missingno');
  }

  public variety(): Promise<string> {
    return this.driver.attribute('data-variety', 'missingno');
  }

  public asResourceCard(): ZResourceCardComponentModel {
    return new ZResourceCardComponentModel(this.driver);
  }

  public next(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'next');
  }

  public previous(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'previous');
  }
}
