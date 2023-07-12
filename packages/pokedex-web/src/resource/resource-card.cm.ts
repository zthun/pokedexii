import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZAlertComponentModel, ZCardComponentModel, ZSuspenseComponentModel } from '@zthun/fashion-boutique';

export class ZResourceCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZResourceCard-root';

  public error(): Promise<ZAlertComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZAlertComponentModel, 'resource-load-error');
  }

  public loading(): Promise<boolean> {
    return new ZCardComponentModel(this.driver).loading();
  }

  public async load(): Promise<void> {
    await ZSuspenseComponentModel.load(this.driver);
  }
}
