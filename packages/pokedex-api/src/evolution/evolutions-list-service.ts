import { Inject, Injectable } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { IZDataRequest, IZFilter, IZPage, ZDataRequestBuilder, ZPageBuilder } from '@zthun/helpful-query';
import { IZEvolution } from '@zthun/pokedex';
import { IZConverter } from '../convert/converter';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { IZResourceListService } from '../resource/resource-service';
import { ZConvertToken, ZSearchToken } from '../resource/resource-tokens';
import { IPokeApiEvolutionChain } from './poke-api-evolution-chain';

@Injectable()
export class ZEvolutionsListService implements IZResourceListService<IZEvolution> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken) private _converter: IZConverter<IPokeApiEvolutionChain[], IZEvolution[]>,
    @Inject(ZSearchToken) private _search: IZConverter<string | undefined, IZFilter | undefined>
  ) {}

  public async list(request: IZDataRequest): Promise<IZPage<IZEvolution>> {
    const search = await this._search.convert(request.search);
    const req = new ZDataRequestBuilder().copy(request).filter(search).build();
    const count = await this._dal.count(ZPokedexCollection.EvolutionChain, req.filter);
    const evolutions = await this._dal.read<IPokeApiEvolutionChain>(ZPokedexCollection.EvolutionChain, req);
    const data = await this._converter.convert(evolutions);
    return new ZPageBuilder<IZEvolution>().data(data).count(count).build();
  }
}
