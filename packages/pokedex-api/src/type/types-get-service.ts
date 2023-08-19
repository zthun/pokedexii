import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { ZDataRequestBuilder, ZFilterBinaryBuilder, ZFilterLogicBuilder } from '@zthun/helpful-query';
import { IZType } from '@zthun/pokedex';
import { IZConverter } from '../convert/converter';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { IZResourceGetService } from '../resource/resource-service';
import { ZConvertToken } from '../resource/resource-tokens';
import { IPokeApiType } from './type';

@Injectable()
export class ZTypesGetService implements IZResourceGetService<IZType> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken) private _converter: IZConverter<IPokeApiType[], IZType[]>
  ) {}

  public async get(identification: string | number): Promise<IZType> {
    const nameFilter = new ZFilterBinaryBuilder().subject('name').equal().value(identification).build();
    const idFilter = new ZFilterBinaryBuilder().subject('id').equal().value(+identification).build();
    const filter = new ZFilterLogicBuilder().or().clause(idFilter).clause(nameFilter).build();
    const request = new ZDataRequestBuilder().filter(filter).build();

    const [type] = await this._dal.read<IPokeApiType>(ZPokedexCollection.Type, request);

    if (type == null) {
      throw new NotFoundException(`Type, ${identification}, was not found.`);
    }

    const [result] = await this._converter.convert([type]);
    return result;
  }
}
