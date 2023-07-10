import { firstDefined } from '@zthun/helpful-fn';
import { keyBy, mapValues } from 'lodash';
import { IPokeApi, ZPokeApi } from '../poke-api/poke-api';
import { IPokeApiConverter } from '../poke-api/poke-api-converter';
import { IPokeApiPage } from '../poke-api/poke-api-page';
import { IPokeApiPokemon } from '../poke-api/poke-api-pokemon';
import { IPokeApiRetrieval } from '../poke-api/poke-api-retrieval';
import { IZPokedexResourceService, ZPokedexResourceService } from '../pokedex-resource/pokedex-resource-service';
import { ZType } from '../type/type';
import { IZPokemon, IZPokemonWeakness, ZPokemonBuilder } from './pokemon';

type Converter = IPokeApiConverter<IPokeApiPokemon, IZPokemon>;
type Retriever = IPokeApiRetrieval<IPokeApiPokemon>;

class ZPokemonService implements Converter, Retriever {
  public constructor(private _api: IPokeApi) {}

  public async list(): Promise<IPokeApiPage> {
    // This first call is just to cache all the types.  There's an issue with
    // the caching layer in the pokeapi-js-wrapper where it does not properly
    // cache things if running concurrently.  So we're just going to cheese this
    // here.
    await Promise.all(Object.values(ZType).map((t) => this._api.type(t)));
    return this._api.pokemons();
  }

  public get(name: string): Promise<IPokeApiPokemon> {
    return this._api.pokemon(name);
  }

  public async convert(resource: IPokeApiPokemon): Promise<IZPokemon> {
    const official = resource.sprites?.other['official-artwork'];
    const artwork = firstDefined(
      '',
      official?.front_default,
      official?.front_female,
      official?.front_shiny,
      official?.front_shiny_female
    );

    const stats = keyBy(resource.stats, (s) => s.stat.name);
    const hp = stats['hp'];
    const attack = stats['attack'];
    const defense = stats['defense'];
    const specialAttack = stats['special-attack'];
    const specialDefense = stats['special-defense'];
    const speed = stats['speed'];

    const types = resource.types.map((t) => t.type.name as ZType);

    const weaknesses = await this._calculateWeaknesses(types);

    const pokemon = new ZPokemonBuilder()
      .id(resource.id)
      .name(resource.name)
      .artwork(artwork)
      .types(types)
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

    return Promise.resolve(pokemon);
  }

  private async _calculateWeaknesses(types: ZType[]): Promise<IZPokemonWeakness[]> {
    // Calculating the weaknesses of the pokemon is done through the number of types that they take double
    // damage from.  These numbers are multiplied together to give either 2x or 4x damage.
    // Double damage from is a 2x multiplier, half damage from is a 0.5x multiplier, and no damage from is
    // a 0x multiplier.
    const _types = await Promise.all(types.map((t) => this._api.type(t)));
    const lookup = mapValues(keyBy(Object.values(ZType)), () => 1);

    _types.forEach((type) => {
      type.damage_relations.double_damage_from.map((dd) => dd.name).forEach((dd) => (lookup[dd] *= 2));
      type.damage_relations.half_damage_from.map((dd) => dd.name).forEach((dd) => (lookup[dd] *= 0.5));
      type.damage_relations.no_damage_from.map((dd) => dd.name).forEach((dd) => (lookup[dd] *= 0));
    });

    const results = Object.keys(lookup).map((type: ZType) => ({ type, damage: lookup[type] }));
    return results.filter((r) => r.damage > 1).map((r) => r as IZPokemonWeakness);
  }
}

export type IZPokemonService = IZPokedexResourceService<IZPokemon>;

export function createPokemonService(api: IPokeApi = ZPokeApi.instance()): IZPokemonService {
  const r = new ZPokemonService(api);
  return new ZPokedexResourceService(r, r);
}
