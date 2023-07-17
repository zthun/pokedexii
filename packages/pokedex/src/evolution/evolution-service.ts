import { ZGender } from '../gender/gender';
import { IPokeApi, ZPokeApi } from '../poke-api/poke-api';
import { IPokeApiConverter } from '../poke-api/poke-api-converter';
import {
  IPokeApiEvolutionChain,
  IPokeApiEvolutionChainDetails,
  IPokeApiEvolutionChainLink
} from '../poke-api/poke-api-evolution-chain';
import { IPokeApiPage } from '../poke-api/poke-api-page';
import { findId } from '../poke-api/poke-api-resource';
import { IPokeApiRetrieval } from '../poke-api/poke-api-retrieval';
import { IZResourceService, ZResourceService } from '../resource/resource-service';
import { IZEvolution, ZEvolutionBuilder } from './evolution';
import { ZEvolutionNodeBuilder } from './evolution-node';
import { ZEvolutionTrigger, ZEvolutionTriggerBuilder } from './evolution-trigger';

type Converter = IPokeApiConverter<IPokeApiEvolutionChain, IZEvolution>;
type Retriever = IPokeApiRetrieval<IPokeApiEvolutionChain>;

class ZEvolutionService implements Converter, Retriever {
  public constructor(private _api: IPokeApi) {}

  public async list(): Promise<IPokeApiPage> {
    return this._api.evolutionList();
  }

  public get(name: string): Promise<IPokeApiEvolutionChain> {
    return this._api.evolution(name);
  }

  public async convert(resource: IPokeApiEvolutionChain): Promise<IZEvolution> {
    const { id, chain } = resource;

    const _convertTrigger = (details: IPokeApiEvolutionChainDetails) => {
      const genders = Object.values(ZGender);

      let trigger = new ZEvolutionTriggerBuilder()
        .id(findId(details.trigger))
        .name(details.trigger.name as ZEvolutionTrigger)
        .rain(details.needs_overworld_rain)
        .turnUpsideDown(details.turn_upside_down);

      trigger = details.min_affection != null ? trigger.affection(details.min_affection) : trigger;
      trigger = details.min_beauty != null ? trigger.beauty(details.min_beauty) : trigger;
      trigger = details.gender != null ? trigger.gender(genders[details.gender - 1]) : trigger;
      trigger = details.min_happiness != null ? trigger.happiness(details.min_happiness) : trigger;
      trigger = details.held_item != null ? trigger.held(details.held_item.name) : trigger;
      trigger = details.item != null ? trigger.item(details.item.name) : trigger;
      trigger = details.min_level != null ? trigger.level(details.min_level) : trigger;
      trigger = details.location != null ? trigger.location(details.location.name) : trigger;
      trigger = details.known_move != null ? trigger.move(details.known_move.name) : trigger;
      trigger = details.known_move_type != null ? trigger.moveType(details.known_move_type.name) : trigger;
      trigger = details.party_species != null ? trigger.partySpecies(details.party_species.name) : trigger;
      trigger = details.party_type != null ? trigger.partyType(details.party_type.name) : trigger;
      trigger = details.time_of_day ? trigger.time(details.time_of_day) : trigger;
      trigger = details.trade_species ? trigger.trade(details.trade_species.name) : trigger;

      trigger =
        details.relative_physical_stats != null
          ? trigger.stats(details.relative_physical_stats.map((s) => s.name))
          : trigger;

      return trigger.build();
    };

    const _convert = (chain: IPokeApiEvolutionChainLink) => {
      const { species, evolution_details, evolves_to } = chain;

      return new ZEvolutionNodeBuilder()
        .species(species.name)
        .triggers(evolution_details.map(_convertTrigger.bind(null)))
        .next(evolves_to.map(_convert))
        .build();
    };

    const evolution = new ZEvolutionBuilder().id(id).head(_convert(chain)).build();
    return Promise.resolve(evolution);
  }
}

export type IZEvolutionService = IZResourceService<IZEvolution>;

export function createEvolutionService(api: IPokeApi = ZPokeApi.instance()): IZEvolutionService {
  const r = new ZEvolutionService(api);
  return new ZResourceService(r, r);
}
