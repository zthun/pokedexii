import { IZType, ZType, ZTypeBuilder } from '@zthun/pokedex';
import { IZConverter } from '../convert/converter';
import { IPokeApiType } from './type';

export class ZTypeConvert implements IZConverter<IPokeApiType, IZType> {
  public convert(resource: IPokeApiType): Promise<IZType> {
    const name = resource.name as ZType;
    const doubleDamageTo = resource.damage_relations.double_damage_to.map((t) => t.name as ZType);
    const doubleDamageFrom = resource.damage_relations.double_damage_from.map((t) => t.name as ZType);

    const halfDamageTo = resource.damage_relations.half_damage_to.map((t) => t.name as ZType);
    const halfDamageFrom = resource.damage_relations.half_damage_from.map((t) => t.name as ZType);

    const noDamageTo = resource.damage_relations.no_damage_to.map((t) => t.name as ZType);
    const noDamageFrom = resource.damage_relations.no_damage_from.map((t) => t.name as ZType);

    return Promise.resolve(
      new ZTypeBuilder()
        .id(resource.id)
        .name(name)
        .doubleDamageTo(doubleDamageTo)
        .doubleDamageFrom(doubleDamageFrom)
        .halfDamageTo(halfDamageTo)
        .halfDamageFrom(halfDamageFrom)
        .noDamageTo(noDamageTo)
        .noDamageFrom(noDamageFrom)
        .build()
    );
  }
}
