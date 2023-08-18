import {
  IZEvolution,
  ZEvolutionBuilder,
  ZEvolutionNodeBuilder,
  ZEvolutionTrigger,
  ZEvolutionTriggerBuilder,
  ZGender,
  ZType
} from '@zthun/pokedex';
import { IZConverter } from '../convert/converter';
import { ZPokeApiResource } from '../resource/resource';
import {
  IPokeApiEvolutionChain,
  IPokeApiEvolutionChainDetails,
  IPokeApiEvolutionChainLink
} from './poke-api-evolution-chain';

export class ZEvolutionConvert implements IZConverter<IPokeApiEvolutionChain, IZEvolution> {
  public async convert(resource: IPokeApiEvolutionChain): Promise<IZEvolution> {
    const { id, chain } = resource;

    const _convertTrigger = (details: IPokeApiEvolutionChainDetails) => {
      const genders = Object.values(ZGender);

      let trigger = new ZEvolutionTriggerBuilder()
        .id(ZPokeApiResource.findId(details.trigger))
        .name(details.trigger.name as ZEvolutionTrigger)
        .rain(details.needs_overworld_rain)
        .turnUpsideDown(details.turn_upside_down);

      trigger = details.min_affection != null ? trigger.affection(details.min_affection) : trigger;
      trigger = details.min_beauty != null ? trigger.beauty(details.min_beauty) : trigger;
      trigger = details.gender != null ? trigger.gender(genders[details.gender - 1]) : trigger;
      trigger = details.min_happiness != null ? trigger.happiness(details.min_happiness) : trigger;
      trigger = details.held_item != null ? trigger.held(details.held_item.name!) : trigger;
      trigger = details.item != null ? trigger.item(details.item.name!) : trigger;
      trigger = details.min_level != null ? trigger.level(details.min_level) : trigger;
      trigger = details.location != null ? trigger.location(details.location.name!) : trigger;
      trigger = details.known_move != null ? trigger.move(details.known_move.name!) : trigger;
      trigger = details.known_move_type != null ? trigger.moveType(details.known_move_type.name! as ZType) : trigger;
      trigger = details.party_species != null ? trigger.partySpecies(details.party_species.name!) : trigger;
      trigger = details.party_type != null ? trigger.partyType(details.party_type.name!) : trigger;
      trigger = details.time_of_day ? trigger.time(details.time_of_day) : trigger;
      trigger = details.trade_species ? trigger.trade(details.trade_species.name!) : trigger;

      trigger =
        details.relative_physical_stats != null
          ? trigger.stats(details.relative_physical_stats.map((s) => s.name!))
          : trigger;

      return trigger.build();
    };

    const _convert = (chain: IPokeApiEvolutionChainLink) => {
      const { species, evolution_details, evolves_to } = chain;

      return new ZEvolutionNodeBuilder()
        .species(species.name!)
        .triggers(evolution_details.map(_convertTrigger.bind(null)))
        .next(evolves_to.map(_convert))
        .build();
    };

    const evolution = new ZEvolutionBuilder().id(id).head(_convert(chain)).build();
    return Promise.resolve(evolution);
  }
}
