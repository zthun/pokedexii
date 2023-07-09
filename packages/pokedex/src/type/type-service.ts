import { IPokeApiPage } from 'src/poke-api/poke-api-page';
import { IPokeApi, ZPokeApi } from '../poke-api/poke-api';
import { IPokeApiConverter } from '../poke-api/poke-api-converter';
import { IPokeApiRetrieval } from '../poke-api/poke-api-retrieval';
import { IPokeApiType } from '../poke-api/poke-api-type';
import { IZPokedexResourceService, ZPokedexResourceService } from '../pokedex-resource/pokedex-resource-service';
import { IZType, ZType, ZTypeBuilder } from './type';

type Converter = IPokeApiConverter<IPokeApiType, IZType>;
type Retriever = IPokeApiRetrieval<IPokeApiType>;

class ZTypeService implements Converter, Retriever {
  public constructor(private _api: IPokeApi) {}

  public list(): Promise<IPokeApiPage> {
    return this._api.types();
  }

  public get(name: string): Promise<IPokeApiType> {
    return this._api.type(name);
  }

  public async convert(resource: IPokeApiType): Promise<IZType> {
    const name = resource.name as ZType;
    const doubleDamageTo = resource.damage_relations.double_damage_to.map((t) => t.name as ZType);
    const doubleDamageFrom = resource.damage_relations.double_damage_from.map((t) => t.name as ZType);

    const halfDamageTo = resource.damage_relations.half_damage_to.map((t) => t.name as ZType);
    const halfDamageFrom = resource.damage_relations.half_damage_from.map((t) => t.name as ZType);

    const noDamageTo = resource.damage_relations.no_damage_to.map((t) => t.name as ZType);
    const noDamageFrom = resource.damage_relations.no_damage_from.map((t) => t.name as ZType);

    return new ZTypeBuilder()
      .name(name)
      .doubleDamageTo(doubleDamageTo)
      .doubleDamageFrom(doubleDamageFrom)
      .halfDamageTo(halfDamageTo)
      .halfDamageFrom(halfDamageFrom)
      .noDamageTo(noDamageTo)
      .noDamageFrom(noDamageFrom)
      .build();
  }
}

export type IZTypeService = IZPokedexResourceService<IZType>;

export function createTypeService(api: IPokeApi = new ZPokeApi()): IZTypeService {
  const r = new ZTypeService(api);
  return new ZPokedexResourceService(r, r);
}