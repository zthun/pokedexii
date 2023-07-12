import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import {
  ZCardComponentModel,
  ZChartComponentModel,
  ZImageSourceComponentModel,
  ZNotFoundComponentModel,
  ZSuspenseComponentModel
} from '@zthun/fashion-boutique';
import { ZPokemonAttributesCardComponentModel } from 'src/pokemon/pokemon-attributes-card.cm';

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

  public attributes(): Promise<ZPokemonAttributesCardComponentModel> {
    return ZCircusBy.first(this.driver, ZPokemonAttributesCardComponentModel);
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
