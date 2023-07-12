import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZChartComponentModel } from '@zthun/fashion-boutique';
import { ZResourceCardComponentModel } from '../resource/resource-card.cm';

export class ZPokemonStatsCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokemonStatsCard-root';

  public pokemon(): Promise<string> {
    return this.driver.attribute('data-name', 'missingno');
  }

  public asResourceCard() {
    return new ZResourceCardComponentModel(this.driver);
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
}
