import { IPokeApi, ZPokeApi } from '../poke-api/poke-api';
import { IPokeApiPage } from '../poke-api/poke-api-page';
import { IZPokemonResourceService, ZPokemonResourceService } from '../pokemon-resource/pokemon-resource-service';
import { IZPokemonType, ZPokemonType, ZPokemonTypeBuilder } from './pokemon-type';

/**
 * Represents an implementation of a resource service that returns types.
 */
export class ZPokemonTypeServiceApi extends ZPokemonResourceService<IZPokemonType> {
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

  public async get(name: string): Promise<IZPokemonType> {
    const p = await this._api.type(name);

    const doubleDamageTo = p.damage_relations.double_damage_to.map((t) => t.name as ZPokemonType);
    const doubleDamageFrom = p.damage_relations.double_damage_from.map((t) => t.name as ZPokemonType);

    const halfDamageTo = p.damage_relations.half_damage_to.map((t) => t.name as ZPokemonType);
    const halfDamageFrom = p.damage_relations.half_damage_from.map((t) => t.name as ZPokemonType);

    const noDamageTo = p.damage_relations.no_damage_to.map((t) => t.name as ZPokemonType);
    const noDamageFrom = p.damage_relations.no_damage_from.map((t) => t.name as ZPokemonType);

    return new ZPokemonTypeBuilder()
      .name(p.name as ZPokemonType)
      .doubleDamageTo(doubleDamageTo)
      .doubleDamageFrom(doubleDamageFrom)
      .halfDamageTo(halfDamageTo)
      .halfDamageFrom(halfDamageFrom)
      .noDamageTo(noDamageTo)
      .noDamageFrom(noDamageFrom)
      .build();
  }

  protected fetch(): Promise<IPokeApiPage> {
    return this._api.types();
  }
}

/**
 * Creates the default instance of the pokemon service.
 */
export function createPokemonTypeService(): IZPokemonResourceService<IZPokemonType> {
  return new ZPokemonTypeServiceApi(new ZPokeApi());
}
