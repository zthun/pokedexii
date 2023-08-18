import { IZType, ZTypeBuilder } from '@zthun/pokedex';
import { ZPokedexCollection } from 'src/database/pokedex-database';
import { IPokeApiResource, ZPokeApiResource } from '../resource/resource';

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

export class ZPokeApiTypeBuilder {
  private _type: IPokeApiType;

  public constructor() {
    this.from(new ZTypeBuilder().build());
  }

  public from(type: IZType): this {
    this._type = {
      damage_relations: {
        double_damage_from: type.doubleDamageFrom.map((d) => ZPokeApiResource.toResource(ZPokedexCollection.Type, d)),
        double_damage_to: type.doubleDamageTo.map((d) => ZPokeApiResource.toResource(ZPokedexCollection.Type, d)),
        half_damage_from: type.halfDamageFrom.map((d) => ZPokeApiResource.toResource(ZPokedexCollection.Type, d)),
        half_damage_to: type.halfDamageTo.map((d) => ZPokeApiResource.toResource(ZPokedexCollection.Type, d)),
        no_damage_from: type.noDamageFrom.map((d) => ZPokeApiResource.toResource(ZPokedexCollection.Type, d)),
        no_damage_to: type.noDamageTo.map((d) => ZPokeApiResource.toResource(ZPokedexCollection.Type, d))
      },
      game_indices: [],
      generation: { name: '', url: '' },
      id: type.id,
      move_damage_class: { name: '', url: '' },
      moves: [],
      name: type.name,
      names: [],
      past_damage_relations: [],
      pokemon: []
    };
    return this;
  }

  public build() {
    return structuredClone(this._type);
  }
}
