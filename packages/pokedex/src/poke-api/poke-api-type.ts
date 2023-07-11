import { IPokeApiNamedResource } from './poke-api-resource';

interface IPokeApiTypeName {
  language: IPokeApiNamedResource;
  name: string;
}

interface IPokeApiTypeGameIndex {
  game_index: number;
  generation: IPokeApiNamedResource;
}

interface IPokeApiTypeDamageRelation {
  double_damage_from: IPokeApiNamedResource[];
  double_damage_to: IPokeApiNamedResource[];
  half_damage_from: IPokeApiNamedResource[];
  half_damage_to: IPokeApiNamedResource[];
  no_damage_from: IPokeApiNamedResource[];
  no_damage_to: IPokeApiNamedResource[];
}

interface IPokeApiPastDamageRelation {
  damage_relations: IPokeApiTypeDamageRelation;
  generation: IPokeApiNamedResource;
}

interface IPokeApiTypePokemon {
  pokemon: IPokeApiNamedResource;
  slot: number;
}

export interface IPokeApiType {
  damage_relations: IPokeApiTypeDamageRelation;
  game_indices: IPokeApiTypeGameIndex[];
  generation: IPokeApiNamedResource;
  id: number;
  move_damage_class: IPokeApiNamedResource;
  moves: IPokeApiNamedResource[];
  name: string;
  names: IPokeApiTypeName[];
  past_damage_relations: IPokeApiPastDamageRelation[];
  pokemon: IPokeApiTypePokemon[];
}
