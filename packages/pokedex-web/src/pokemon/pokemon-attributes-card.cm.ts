import { IZCircusDriver, ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZType } from '@zthun/pokedex';
import { kebabCase } from 'lodash';
import { ZResourceCardComponentModel } from '../resource/resource-card.cm';
import { ZTypeBadgeComponentModel } from '../type/type-badge.cm';

/**
 * Represents the component model for the pokemon details page.
 */
export class ZPokemonAttributesCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokemonAttributesCard-root';

  public pokemon(): Promise<string> {
    return this.driver.attribute('data-name', 'missingno');
  }

  public asResourceCard(): ZResourceCardComponentModel {
    return new ZResourceCardComponentModel(this.driver);
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

  public async abilities(): Promise<string[]> {
    const group = await this.driver.query('.ZPokemonAttributesCard-ability');
    const abilities = await Promise.all(group.map((a) => a.text()));
    return abilities.map((f) => f.replace('(Hidden)', '').trim()).map((a) => kebabCase(a));
  }

  public async has4xDamage(type: ZType): Promise<boolean> {
    const weakness = await this.weakness(type);
    const item = await weakness?.item();
    const suffix = await item?.suffix();
    const found = await suffix?.peek('.ZTypeBadges-4x-damage');
    return !!found;
  }
}
