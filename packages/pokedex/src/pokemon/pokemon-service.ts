import { firstDefined } from '@zthun/helpful-fn';
import { keyBy } from 'lodash';
import { IPokeApi, ZPokeApi } from '../poke-api/poke-api';
import { IPokeApiConverter } from '../poke-api/poke-api-converter';
import { IPokeApiPage } from '../poke-api/poke-api-page';
import { IPokeApiPokemon } from '../poke-api/poke-api-pokemon';
import { IPokeApiRetrieval } from '../poke-api/poke-api-retrieval';
import { IZPokedexResourceService, ZPokedexResourceService } from '../pokedex-resource/pokedex-resource-service';
import { ZType } from '../type/type';
import { IZPokemon, ZPokemonBuilder } from './pokemon';

type Converter = IPokeApiConverter<IPokeApiPokemon, IZPokemon>;
type Retriever = IPokeApiRetrieval<IPokeApiPokemon>;

class ZPokemonService implements Converter, Retriever {
  public constructor(private _api: IPokeApi) {}

  public list(): Promise<IPokeApiPage> {
    return this._api.pokemons();
  }

  public get(name: string): Promise<IPokeApiPokemon> {
    return this._api.pokemon(name);
  }

  public convert(resource: IPokeApiPokemon): Promise<IZPokemon> {
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
    const pokemon = new ZPokemonBuilder()
      .id(resource.id)
      .name(resource.name)
      .artwork(artwork)
      .types(types)
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
}

export type IZPokemonService = IZPokedexResourceService<IZPokemon>;

export function createPokemonService(api: IPokeApi = new ZPokeApi()): IZPokemonService {
  const r = new ZPokemonService(api);
  return new ZPokedexResourceService(r, r);
}
