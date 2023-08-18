import { Inject, Injectable } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { firstDefined } from '@zthun/helpful-fn';
import { IZPokemon, IZPokemonAbility, IZPokemonWeakness, ZPokemonBuilder, ZType } from '@zthun/pokedex';
import { keyBy, mapValues } from 'lodash';
import { IZConverter } from '../convert/converter';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { IPokeApiType } from '../type/type';
import { IPokeApiPokemon } from './pokemon';

@Injectable()
export class ZPokemonConvert implements IZConverter<IPokeApiPokemon[], IZPokemon[]> {
  public constructor(@Inject(ZDatabaseToken) private readonly _dal: IZDatabaseDocument) {}

  public async convert(resources: IPokeApiPokemon[]): Promise<IZPokemon[]> {
    const _types = await this._dal.read<IPokeApiType>(ZPokedexCollection.Type);

    return resources.map((resource) => {
      const official = resource.sprites?.other['official-artwork'];
      const artwork = firstDefined(
        '',
        official?.front_default,
        official?.front_female,
        official?.front_shiny,
        official?.front_shiny_female
      );

      const stats = keyBy(resource.stats, (s) => s.stat.name!);
      const hp = stats['hp'];
      const attack = stats['attack'];
      const defense = stats['defense'];
      const specialAttack = stats['special-attack'];
      const specialDefense = stats['special-defense'];
      const speed = stats['speed'];

      const types = resource.types.map((t) => t.type.name as ZType);

      const abilities: IZPokemonAbility[] = resource.abilities.map((a) => ({
        name: a.ability.name!,
        hidden: a.is_hidden
      }));

      // Calculating the weaknesses of the pokemon is done through the number of types that they take double
      // damage from.  These numbers are multiplied together to give either 2x or 4x damage.
      // Double damage from is a 2x multiplier, half damage from is a 0.5x multiplier, and no damage from is
      // a 0x multiplier.

      const lookup = mapValues(keyBy(Object.values(ZType)), () => 1);

      _types.forEach((type) => {
        type.damage_relations.double_damage_from.map((dd) => dd.name!).forEach((dd) => (lookup[dd] *= 2));
        type.damage_relations.half_damage_from.map((dd) => dd.name!).forEach((dd) => (lookup[dd] *= 0.5));
        type.damage_relations.no_damage_from.map((dd) => dd.name!).forEach((dd) => (lookup[dd] *= 0));
      });

      const results = Object.keys(lookup).map((type: ZType) => ({ type, damage: lookup[type] }));
      const weaknesses = results.filter((r) => r.damage > 1).map((r) => r as IZPokemonWeakness);

      return new ZPokemonBuilder()
        .id(resource.id)
        .name(resource.name)
        .artwork(artwork)
        .types(types)
        .abilities(abilities)
        .weaknesses(weaknesses)
        .hp(hp.base_stat, hp.effort)
        .attack(attack.base_stat, attack.effort)
        .defense(defense.base_stat, defense.effort)
        .specialAttack(specialAttack.base_stat, specialAttack.effort)
        .specialDefense(specialDefense.base_stat, specialDefense.effort)
        .speed(speed.base_stat, speed.effort)
        .height(resource.height)
        .weight(resource.weight)
        .build();
    });
  }
}
