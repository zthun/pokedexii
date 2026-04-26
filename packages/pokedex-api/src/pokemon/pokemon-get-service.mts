import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IZDatabaseDocument } from "@zthun/dalmart-db";
import {
  ZDataRequestBuilder,
  ZFilterBinaryBuilder,
  ZFilterLogicBuilder,
} from "@zthun/helpful-query";
import type { IZPokemon } from "@zthun/pokedex";

import type { IZConverter } from "../convert/converter.mjs";
import {
  ZDatabaseToken,
  ZPokedexCollection,
} from "../database/pokedex-database.mjs";
import type { IZResourceGetService } from "../resource/resource-service.mjs";
import { ZConvertToken } from "../resource/resource-tokens.mjs";
import type { IPokeApiPokemon } from "./pokemon.mjs";

@Injectable()
export class ZPokemonGetService implements IZResourceGetService<IZPokemon> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken)
    private readonly _converter: IZConverter<IPokeApiPokemon[], IZPokemon[]>,
  ) {}

  public async get(identification: string | number): Promise<IZPokemon> {
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

    const [pokemon] = await this._dal.read<IPokeApiPokemon>(
      ZPokedexCollection.Pokemon,
      request,
    );

    if (pokemon == null) {
      throw new NotFoundException(`Pokemon, ${identification}, was not found.`);
    }

    const [result] = await this._converter.convert([pokemon]);
    return result;
  }
}
