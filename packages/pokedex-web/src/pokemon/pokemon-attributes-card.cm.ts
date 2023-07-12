import { IZCircusDriver, ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZType } from '@zthun/pokedex';
import { ZResourceCardComponentModel } from 'src/resource/resource-card.cm';
import { ZTypeBadgeComponentModel } from '../type/type-badge.cm';

/**
 * Represents the component model for the pokemon details page.
 */
export class ZPokemonAttributesCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokemonAttributesCard-root';

  public pokemon(): Promise<string> {
    return this.driver.attribute('data-name', 'missingno');
  }

  public card(): Promise<ZResourceCardComponentModel> {
    return Promise.resolve(new ZResourceCardComponentModel(this.driver));
  }

  public async height(): Promise<string> {
    return (await this.driver.select('.ZPokemonAttributesCard-height')).text();
  }

  public async weight(): Promise<string> {
    return (await this.driver.select('.ZPokemonAttributesCard-weight')).text();
  }

  public async types(): Promise<ZTypeBadgeComponentModel[]> {
    const group = await this.driver.select('.ZPokemonAttributesCard-types');
    return ZCircusBy.all(group, ZTypeBadgeComponentModel);
  }

  private async _weaknesses(): Promise<IZCircusDriver> {
    return this.driver.select('.ZPokemonAttributesCard-weaknesses');
  }

  public async weaknesses(): Promise<ZTypeBadgeComponentModel[]> {
    const group = await this._weaknesses();
    return ZCircusBy.all(group, ZTypeBadgeComponentModel);
  }

  public async weakness(type: ZType): Promise<ZTypeBadgeComponentModel | null> {
    const group = await this._weaknesses();
    return ZCircusBy.optional(group, ZTypeBadgeComponentModel, type);
  }

  public async has4xDamage(type: ZType): Promise<boolean> {
    const weakness = await this.weakness(type);
    const item = await weakness?.item();
    const suffix = await item?.suffix();
    const found = await suffix?.peek('.ZTypeBadges-4x-damage');
    return !!found;
  }
}
