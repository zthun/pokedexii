import { IPokeApiNamedResource } from './poke-api-resource';

export interface IPokeApiEvolutionChainDetails {
  gender: number | null;
  held_item: IPokeApiNamedResource | null;
  item: IPokeApiNamedResource | null;
  known_move: IPokeApiNamedResource | null;
  known_move_type: IPokeApiNamedResource | null;
  location: IPokeApiNamedResource | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: IPokeApiNamedResource | null;
  party_type: IPokeApiNamedResource | null;
  relative_physical_stats: IPokeApiNamedResource[] | null;
  time_of_day: string;
  trade_species: IPokeApiNamedResource | null;
  trigger: IPokeApiNamedResource;
  turn_upside_down: boolean;
}

export interface IPokeApiEvolutionChainLink {
  evolution_details: IPokeApiEvolutionChainDetails[];
  evolves_to: IPokeApiEvolutionChainLink[];
  is_baby: boolean;
  species: IPokeApiNamedResource;
}

export interface IPokeApiEvolutionChain {
  baby_trigger_item: unknown;
  chain: IPokeApiEvolutionChainLink;
  id: number;
}
