import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZNotFoundComponentModel,
  ZSuspenseComponentModel,
} from "@zthun/fashion-boutique";

import { ZEvolutionChainCardComponentModel } from "../evolution/evolution-chain-card.cm.mjs";
import { ZPokemonAttributesCardComponentModel } from "../pokemon/pokemon-attributes-card.cm.mjs";
import { ZPokemonStatsCardComponentModel } from "../pokemon/pokemon-stats-card.cm.mjs";
import { ZSpeciesVarietiesCardComponentModel } from "./species-varieties-card.cm.mjs";

/**
 * Represents the component model for the pokemon details page.
 */
export class ZSpeciesDetailsPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZSpeciesDetailsPage-root";

  public species(): Promise<string> {
    return this.driver.attribute("data-name", "missingno");
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

  public evolution(): Promise<ZEvolutionChainCardComponentModel> {
    return ZCircusBy.first(this.driver, ZEvolutionChainCardComponentModel);
  }

  public async notFound(): Promise<ZNotFoundComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZNotFoundComponentModel);
  }

  public async load(): Promise<void> {
    return this.driver.wait(() =>
      ZCircusBy.optional(this.driver, ZSuspenseComponentModel).then((o) => !o),
    );
  }
}
