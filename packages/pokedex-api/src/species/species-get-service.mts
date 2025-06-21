import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IZDatabaseDocument } from "@zthun/dalmart-db";
import { ZDatabaseDocumentCollectionBuilder } from "@zthun/dalmart-db";
import {
  ZDataRequestBuilder,
  ZFilterBinaryBuilder,
  ZFilterLogicBuilder,
} from "@zthun/helpful-query";
import type { IZSpecies } from "@zthun/pokedex";
import type { IZConverter } from "../convert/converter.mjs";
import {
  ZDatabaseToken,
  ZPokedexCollection,
} from "../database/pokedex-database.mjs";
import type { IZResourceGetService } from "../resource/resource-service.mjs";
import { ZConvertToken } from "../resource/resource-tokens.mjs";
import type { IPokeApiSpecies } from "./species.mjs";

@Injectable()
export class ZSpeciesGetService implements IZResourceGetService<IZSpecies> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken)
    private _converter: IZConverter<IPokeApiSpecies[], IZSpecies[]>,
  ) {}

  public async get(identification: string | number): Promise<IZSpecies> {
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

    const collection = new ZDatabaseDocumentCollectionBuilder(
      ZPokedexCollection.PokemonSpecies,
    )
      .join(
        ZPokedexCollection.Pokemon,
        "varieties.pokemon.name",
        "name",
        "pokemon",
      )
      .build();

    const [species] = await this._dal.read<IPokeApiSpecies>(
      collection,
      request,
    );

    if (species == null) {
      throw new NotFoundException(`Species, ${identification}, was not found.`);
    }

    const [result] = await this._converter.convert([species]);
    return result;
  }
}
