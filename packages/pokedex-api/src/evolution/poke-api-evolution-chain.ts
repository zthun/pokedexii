import { IZEvolution, IZEvolutionNode, IZEvolutionTrigger, ZEvolutionBuilder, ZGender } from '@zthun/pokedex';
import { ZPokedexCollection } from 'src/database/pokedex-database';
import { IPokeApiResource, ZPokeApiResource } from '../resource/resource';

export interface IPokeApiEvolutionChainDetails {
  gender: number | null;
  held_item: IPokeApiResource | null;
  item: IPokeApiResource | null;
  known_move: IPokeApiResource | null;
  known_move_type: IPokeApiResource | null;
  location: IPokeApiResource | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: IPokeApiResource | null;
  party_type: IPokeApiResource | null;
  relative_physical_stats: IPokeApiResource[] | null;
  time_of_day: string;
  trade_species: IPokeApiResource | null;
  trigger: IPokeApiResource;
  turn_upside_down: boolean;
}

export interface IPokeApiEvolutionChainLink {
  evolution_details: IPokeApiEvolutionChainDetails[];
  evolves_to: IPokeApiEvolutionChainLink[];
  is_baby: boolean;
  species: IPokeApiResource;
}

export interface IPokeApiEvolutionChain {
  baby_trigger_item: unknown;
  chain: IPokeApiEvolutionChainLink;
  id: number;
}

export class ZPokeApiEvolutionChainBuilder {
  private _evolution: IPokeApiEvolutionChain;

  public constructor() {
    this.from(new ZEvolutionBuilder().build());
  }

  public from(other: IZEvolution): this {
    const genders = Object.values(ZGender);

    const createApiEvolutionDetails = (node: IZEvolutionTrigger): IPokeApiEvolutionChainDetails => {
      const gender = node.gender ? genders.indexOf(node.gender) + 1 : null;
      const held_item = node.held ? ZPokeApiResource.toResource(ZPokedexCollection.Item, node.held) : null;
      const item = node.item ? ZPokeApiResource.toResource(ZPokedexCollection.Item, node.item) : null;
      const known_move = node.move ? ZPokeApiResource.toResource(ZPokedexCollection.Move, node.move) : null;
      const known_move_type = node.moveType
        ? ZPokeApiResource.toResource(ZPokedexCollection.Type, node.moveType)
        : null;
      const location = node.location ? ZPokeApiResource.toResource(ZPokedexCollection.Location, node.location) : null;
      const min_affection = node.affection ?? null;
      const min_beauty = node.beauty ?? null;
      const min_happiness = node.happiness ?? null;
      const min_level = node.level ?? null;
      const needs_overworld_rain = node.rain;
      const party_species = node.partySpecies
        ? ZPokeApiResource.toResource(ZPokedexCollection.PokemonSpecies, node.partySpecies)
        : null;
      const party_type = node.partyType ? ZPokeApiResource.toResource(ZPokedexCollection.Type, node.partyType) : null;
      const relative_physical_stats = node.stats
        ? node.stats.map((s) => ZPokeApiResource.toResource(ZPokedexCollection.Stat, s))
        : null;
      const time_of_day = node.time || '';
      const trade_species = node.trade
        ? ZPokeApiResource.toResource(ZPokedexCollection.PokemonSpecies, node.trade)
        : null;
      const trigger = ZPokeApiResource.toResource(ZPokedexCollection.EvolutionTrigger, node.id, node.name);
      const turn_upside_down = node.turnUpsideDown;

      return {
        gender,
        held_item,
        item,
        known_move,
        known_move_type,
        location,
        min_affection,
        min_beauty,
        min_happiness,
        min_level,
        needs_overworld_rain,
        party_species,
        party_type,
        relative_physical_stats,
        time_of_day,
        trade_species,
        trigger,
        turn_upside_down
      };
    };

    const createApiEvolutionChain = (node: IZEvolutionNode): IPokeApiEvolutionChainLink => ({
      evolution_details: node.triggers.map(createApiEvolutionDetails),
      evolves_to: node.next.map(createApiEvolutionChain),
      is_baby: false,
      species: ZPokeApiResource.toResource(ZPokedexCollection.PokemonSpecies, node.species)
    });

    this._evolution = {
      baby_trigger_item: null,
      chain: createApiEvolutionChain(other.head),
      id: other.id
    };

    return this;
  }

  public build() {
    return structuredClone(this._evolution);
  }
}
