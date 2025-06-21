import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IZDatabaseDocument } from "@zthun/dalmart-db";
import {
  ZDataRequestBuilder,
  ZFilterBinaryBuilder,
  ZFilterLogicBuilder,
} from "@zthun/helpful-query";
import type { IZEvolution } from "@zthun/pokedex";
import type { IZConverter } from "../convert/converter.mjs";
import {
  ZDatabaseToken,
  ZPokedexCollection,
} from "../database/pokedex-database.mjs";
import type { IZResourceGetService } from "../resource/resource-service.mjs";
import { ZConvertToken } from "../resource/resource-tokens.mjs";
import type { IPokeApiEvolutionChain } from "./poke-api-evolution-chain.mjs";

@Injectable()
export class ZEvolutionsGetService
  implements IZResourceGetService<IZEvolution>
{
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken)
    private readonly _converter: IZConverter<
      IPokeApiEvolutionChain[],
      IZEvolution[]
    >,
  ) {}

  public async get(identification: string | number): Promise<IZEvolution> {
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

    const [pokemon] = await this._dal.read<IPokeApiEvolutionChain>(
      ZPokedexCollection.EvolutionChain,
      request,
    );

    if (pokemon == null) {
      throw new NotFoundException(
        `Evolution, ${identification}, was not found.`,
      );
    }

    const [result] = await this._converter.convert([pokemon]);
    return result;
  }
}
