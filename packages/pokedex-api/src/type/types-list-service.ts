import { Inject, Injectable } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import {
  IZDataRequest,
  IZFilter,
  IZPage,
  ZDataRequestBuilder,
  ZFilterCollectionBuilder,
  ZFilterLogicBuilder,
  ZFilterUnaryBuilder,
  ZPageBuilder
} from '@zthun/helpful-query';
import { IZType, ZType } from '@zthun/pokedex';
import { IZConverter } from '../convert/converter';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { IZResourceListService } from '../resource/resource-service';
import { ZConvertToken, ZSearchToken } from '../resource/resource-tokens';
import { IPokeApiType } from './type';

@Injectable()
export class ZTypesListService implements IZResourceListService<IZType> {
  public constructor(
    @Inject(ZDatabaseToken) private readonly _dal: IZDatabaseDocument,
    @Inject(ZConvertToken) private readonly _converter: IZConverter<IPokeApiType[], IZType[]>,
    @Inject(ZSearchToken) private readonly _search: IZConverter<string | undefined, IZFilter | undefined>
  ) {}

  public async list(request: IZDataRequest): Promise<IZPage<IZType>> {
    const truthy = new ZFilterUnaryBuilder().subject('name').isNotNull().build();
    const search = await this._search.convert(request.search);
    const exclude = new ZFilterCollectionBuilder()
      .subject('name')
      .notIn()
      .value(ZType.Unknown)
      .value(ZType.Shadow)
      .build();
    const filter = new ZFilterLogicBuilder()
      .and()
      .clause(search || truthy)
      .clause(exclude)
      .build();
    const req = new ZDataRequestBuilder().copy(request).filter(filter).build();
    const count = await this._dal.count(ZPokedexCollection.Type, req.filter);
    const types = await this._dal.read<IPokeApiType>(ZPokedexCollection.Type, req);
    const data = await this._converter.convert(types);
    return new ZPageBuilder<IZType>().data(data).count(count).build();
  }
}
