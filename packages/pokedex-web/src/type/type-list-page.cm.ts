import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZGridViewComponentModel } from '@zthun/fashion-boutique';
import { ZType } from '@zthun/pokedex';
import { ZTypeCardComponentModel } from './type-card.cm';

export class ZTypeListPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTypeListPage-root';

  public grid(): Promise<ZGridViewComponentModel> {
    return Promise.resolve(new ZGridViewComponentModel(this.driver));
  }

  public async cards(): Promise<ZTypeCardComponentModel[]> {
    return ZCircusBy.all(this.driver, ZTypeCardComponentModel);
  }

  public async card(type: ZType): Promise<ZTypeCardComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZTypeCardComponentModel, type);
  }
}
