import { firstDefined } from '@zthun/helpful-fn';
import { last, split } from 'lodash';
import { IPokeApi, ZPokeApi } from '../poke-api/poke-api';
import { IPokeApiConverter } from '../poke-api/poke-api-converter';
import { IPokeApiPage } from '../poke-api/poke-api-page';
import { IPokeApiRetrieval } from '../poke-api/poke-api-retrieval';
import { IPokeApiSpecies } from '../poke-api/poke-api-species';
import { IZResourceService, ZResourceService } from '../resource/resource-service';
import { IZSpecies, ZSpeciesBuilder } from './species';

type Converter = IPokeApiConverter<IPokeApiSpecies, IZSpecies>;
type Retriever = IPokeApiRetrieval<IPokeApiSpecies>;

class ZSpeciesService implements Converter, Retriever {
  public constructor(private _api: IPokeApi) {}

  public async list(): Promise<IPokeApiPage> {
    return this._api.speciesList();
  }

  public get(name: string): Promise<IPokeApiSpecies> {
    return this._api.species(name);
  }

  public async convert(resource: IPokeApiSpecies): Promise<IZSpecies> {
    const evolution = firstDefined('0', last(split(resource.evolution_chain.url, '/')));

    let species = new ZSpeciesBuilder()
      .happiness(resource.base_happiness)
      .id(resource.id)
      .capture(resource.capture_rate)
      .name(resource.name)
      .evolution(+evolution);

    resource.varieties.forEach((v) => {
      species = species.variety(v.pokemon.name, v.is_default);
    });

    return Promise.resolve(species.build());
  }
}

export type IZSpeciesService = IZResourceService<IZSpecies>;

export function createSpeciesService(api: IPokeApi = ZPokeApi.instance()): IZSpeciesService {
  const r = new ZSpeciesService(api);
  return new ZResourceService(r, r);
}
