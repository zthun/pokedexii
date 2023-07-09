import { IPokeApiResource } from './poke-api-resource';

interface IPokeApiTypeName {
  language: IPokeApiResource;
  name: string;
}

interface IPokeApiTypeGameIndex {
  game_index: number;
  generation: IPokeApiResource;
}

interface IPokeApiTypeDamageRelation {
  double_damage_from: IPokeApiResource[];
  double_damage_to: IPokeApiResource[];
  half_damage_from: IPokeApiResource[];
  half_damage_to: IPokeApiResource[];
  no_damage_from: IPokeApiResource[];
  no_damage_to: IPokeApiResource[];
}

interface IPokeApiPastDamageRelation {
  damage_relations: IPokeApiTypeDamageRelation;
  generation: IPokeApiResource;
}

interface IPokeApiTypePokemon {
  pokemon: IPokeApiResource;
  slot: number;
}

export interface IPokeApiType {
  damage_relations: IPokeApiTypeDamageRelation;
  game_indices: IPokeApiTypeGameIndex[];
  generation: IPokeApiResource;
  id: number;
  move_damage_class: IPokeApiResource;
  moves: IPokeApiResource[];
  name: string;
  names: IPokeApiTypeName[];
  past_damage_relations: IPokeApiPastDamageRelation[];
  pokemon: IPokeApiTypePokemon[];
}
