import { firstDefined } from '@zthun/helpful-fn';
import { keyBy } from 'lodash';
import { IPokeApiPage } from 'src/poke-api/poke-api-page';
import { IPokeApi, ZPokeApi } from '../poke-api/poke-api';
import { IZPokemonResourceService, ZPokemonResourceService } from '../pokemon-resource/pokemon-resource-service';
import { ZPokemonType } from '../pokemon-type/pokemon-type';
import { IZPokemon, ZPokemonBuilder } from './pokemon';

/**
 * Represents an implementation of a resource service that
 * returns pokemon.
 */
export class ZPokemonServiceApi extends ZPokemonResourceService<IZPokemon> {
  /**
   * Initializes a new instance of this object.
   *
   * @param _api -
   *        The _api service that will be responsible for
   *        querying out to the pokeapi endpoints.
   */
  public constructor(private _api: IPokeApi) {
    super();
  }

  public async get(name: string): Promise<IZPokemon> {
    const p = await this._api.pokemon(name);

    const official = p.sprites?.other['official-artwork'];
    const artwork = firstDefined(
      '',
      official?.front_default,
      official?.front_female,
      official?.front_shiny,
      official?.front_shiny_female
    );

    const stats = keyBy(p.stats, (s) => s.stat.name);
    const hp = stats['hp'];
    const attack = stats['attack'];
    const defense = stats['defense'];
    const specialAttack = stats['special-attack'];
    const specialDefense = stats['special-defense'];
    const speed = stats['speed'];

    const types = p.types.map((t) => t.type.name as ZPokemonType);
    return new ZPokemonBuilder()
      .who(p.id, p.name)
      .artwork(artwork)
      .types(types)
      .hp(hp.base_stat, hp.effort)
      .attack(attack.base_stat, attack.effort)
      .defense(defense.base_stat, defense.effort)
      .specialAttack(specialAttack.base_stat, specialAttack.effort)
      .specialDefense(specialDefense.base_stat, specialDefense.effort)
      .speed(speed.base_stat, speed.effort)
      .height(p.height)
      .weight(p.weight)
      .build();
  }

  protected fetch(): Promise<IPokeApiPage> {
    return this._api.pokemons();
  }
}

/**
 * Creates the default instance of the pokemon service.
 */
export function createPokemonService(): IZPokemonResourceService<IZPokemon> {
  return new ZPokemonServiceApi(new ZPokeApi());
}
