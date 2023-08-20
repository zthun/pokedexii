import { Inject, Injectable } from '@nestjs/common';
import { IZDatabaseDocument, ZDatabaseDocumentCollectionBuilder } from '@zthun/dalmart-db';
import { IZDataRequest, IZFilter, IZPage, ZDataRequestBuilder, ZPageBuilder } from '@zthun/helpful-query';
import { IZSpecies } from '@zthun/pokedex';
import { IZConverter } from '../convert/converter';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { IZResourceListService } from '../resource/resource-service';
import { ZConvertToken, ZSearchToken } from '../resource/resource-tokens';
import { IPokeApiSpecies } from './species';

@Injectable()
export class ZSpeciesListService implements IZResourceListService<IZSpecies> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken) private _converter: IZConverter<IPokeApiSpecies[], IZSpecies[]>,
    @Inject(ZSearchToken) private _search: IZConverter<string | undefined, IZFilter | undefined>
  ) {}

  public async list(request: IZDataRequest): Promise<IZPage<IZSpecies>> {
    const search = await this._search.convert(request.search);
    const req = new ZDataRequestBuilder().copy(request).filter(search).build();
    const collection = new ZDatabaseDocumentCollectionBuilder(ZPokedexCollection.PokemonSpecies)
      .join(ZPokedexCollection.Pokemon, 'varieties.pokemon.name', 'name', 'pokemon')
      .build();
    const count = await this._dal.count(collection, req.filter);
    const species = await this._dal.read<IPokeApiSpecies>(collection, req);
    const data = await this._converter.convert(species);
    return new ZPageBuilder<IZSpecies>().data(data).count(count).build();
  }
}
