import { IZCircusDriver, ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import {
  ZCardComponentModel,
  ZChartComponentModel,
  ZImageSourceComponentModel,
  ZNotFoundComponentModel,
  ZSuspenseComponentModel
} from '@zthun/fashion-boutique';
import { ZType } from '@zthun/pokedex';
import { ZTypeBadgeComponentModel } from '../type/type-badge.cm';

/**
 * Represents the component model for the pokemon details page.
 */
export class ZSpeciesDetailsPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZSpeciesDetailsPage-root';

  public pokemon(): Promise<ZCardComponentModel> {
    return ZCircusBy.first(this.driver, ZCardComponentModel, 'pokemon');
  }

  public async name(): Promise<string> {
    const pokemon = await this.pokemon();
    return pokemon.heading();
  }

  public async id(): Promise<string> {
    const pokemon = await this.pokemon();
    return pokemon.subHeading();
  }

  public async artwork(): Promise<string | null> {
    const pokemon = await this.pokemon();
    const content = await pokemon.content();
    const artwork = await ZCircusBy.first(content, ZImageSourceComponentModel, 'artwork');
    const img = await artwork.driver.select('img');
    return img.attribute('src');
  }

  public async height(): Promise<string> {
    return (await this.driver.select('.ZSpeciesDetailsPage-height')).text();
  }

  public async weight(): Promise<string> {
    return (await this.driver.select('.ZSpeciesDetailsPage-weight')).text();
  }

  public async types(): Promise<ZTypeBadgeComponentModel[]> {
    const group = await this.driver.select('.ZSpeciesDetailsPage-types');
    return ZCircusBy.all(group, ZTypeBadgeComponentModel);
  }

  private async _weaknesses(): Promise<IZCircusDriver> {
    return this.driver.select('.ZSpeciesDetailsPage-weaknesses');
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

  public async hp(): Promise<ZChartComponentModel> {
    return ZCircusBy.first(this.driver, ZChartComponentModel, 'hp');
  }

  public async attack(): Promise<ZChartComponentModel> {
    return ZCircusBy.first(this.driver, ZChartComponentModel, 'attack');
  }

  public async defense(): Promise<ZChartComponentModel> {
    return ZCircusBy.first(this.driver, ZChartComponentModel, 'defense');
  }

  public async specialAttack(): Promise<ZChartComponentModel> {
    return ZCircusBy.first(this.driver, ZChartComponentModel, 'special-attack');
  }

  public async specialDefense(): Promise<ZChartComponentModel> {
    return ZCircusBy.first(this.driver, ZChartComponentModel, 'special-defense');
  }

  public async speed(): Promise<ZChartComponentModel> {
    return ZCircusBy.first(this.driver, ZChartComponentModel, 'speed');
  }

  public async notFound(): Promise<ZNotFoundComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZNotFoundComponentModel);
  }

  public async load(): Promise<void> {
    await ZSuspenseComponentModel.load(this.driver);
  }
}
