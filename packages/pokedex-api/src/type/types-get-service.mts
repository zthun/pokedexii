import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IZDatabaseDocument } from "@zthun/dalmart-db";
import {
  ZDataRequestBuilder,
  ZFilterBinaryBuilder,
  ZFilterLogicBuilder,
} from "@zthun/helpful-query";
import type { IZType } from "@zthun/pokedex";

import type { IZConverter } from "../convert/converter.mjs";
import {
  ZDatabaseToken,
  ZPokedexCollection,
} from "../database/pokedex-database.mjs";
import type { IZResourceGetService } from "../resource/resource-service.mjs";
import { ZConvertToken } from "../resource/resource-tokens.mjs";
import type { IPokeApiType } from "./type.mjs";

@Injectable()
export class ZTypesGetService implements IZResourceGetService<IZType> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken)
    private _converter: IZConverter<IPokeApiType[], IZType[]>,
  ) {}

  public async get(identification: string | number): Promise<IZType> {
    const nameFilter = new ZFilterBinaryBuilder()
      .subject("name")
      .equal()
      .value(identification)
      .build();
    const idFilter = new ZFilterBinaryBuilder()
      .subject("id")
      .equal()
      .value(+identification)
      .build();
    const filter = new ZFilterLogicBuilder()
      .or()
      .clause(idFilter)
      .clause(nameFilter)
      .build();
    const request = new ZDataRequestBuilder().filter(filter).build();

    const [type] = await this._dal.read<IPokeApiType>(
      ZPokedexCollection.Type,
      request,
    );

    if (type == null) {
      throw new NotFoundException(`Type, ${identification}, was not found.`);
    }

    const [result] = await this._converter.convert([type]);
    return result;
  }
}
