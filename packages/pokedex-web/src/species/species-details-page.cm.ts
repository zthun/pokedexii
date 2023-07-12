import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZNotFoundComponentModel, ZSuspenseComponentModel } from '@zthun/fashion-boutique';
import { ZPokemonAttributesCardComponentModel } from '../pokemon/pokemon-attributes-card.cm';
import { ZPokemonStatsCardComponentModel } from '../pokemon/pokemon-stats-card.cm';
import { ZSpeciesVarietiesCardComponentModel } from './species-varieties-card.cm';

/**
 * Represents the component model for the pokemon details page.
 */
export class ZSpeciesDetailsPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZSpeciesDetailsPage-root';

  public species(): Promise<string> {
    return this.driver.attribute('data-name', 'missingno');
  }

  public attributes(): Promise<ZPokemonAttributesCardComponentModel> {
    return ZCircusBy.first(this.driver, ZPokemonAttributesCardComponentModel);
  }

  public stats(): Promise<ZPokemonStatsCardComponentModel> {
    return ZCircusBy.first(this.driver, ZPokemonStatsCardComponentModel);
  }

  public varieties(): Promise<ZSpeciesVarietiesCardComponentModel> {
    return ZCircusBy.first(this.driver, ZSpeciesVarietiesCardComponentModel);
  }

  public async notFound(): Promise<ZNotFoundComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZNotFoundComponentModel);
  }

  public async load(): Promise<void> {
    await ZSuspenseComponentModel.load(this.driver);
  }
}
