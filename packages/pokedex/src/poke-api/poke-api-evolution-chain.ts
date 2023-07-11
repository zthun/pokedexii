import { IPokeApiResource } from './poke-api-resource';

export interface IPokeApiEvolutionChainDetails {
  gender: number | null;
  held_item: IPokeApiResource | null;
  item: IPokeApiResource | null;
  known_move: IPokeApiResource | null;
  known_move_type: IPokeApiResource | null;
  location: IPokeApiResource | null;
  min_affection: number;
  min_beauty: number;
  min_happiness: number;
  min_level: number;
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
