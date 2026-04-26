import { Inject, Injectable } from "@nestjs/common";
import type { IZDatabaseDocument } from "@zthun/dalmart-db";
import { ZDatabaseDocumentCollectionBuilder } from "@zthun/dalmart-db";
import type { IZDataRequest, IZFilter, IZPage } from "@zthun/helpful-query";
import { ZDataRequestBuilder, ZPageBuilder } from "@zthun/helpful-query";
import type { IZSpecies } from "@zthun/pokedex";

import type { IZConverter } from "../convert/converter.mjs";
import {
  ZDatabaseToken,
  ZPokedexCollection,
} from "../database/pokedex-database.mjs";
import type { IZResourceListService } from "../resource/resource-service.mjs";
import { ZConvertToken, ZSearchToken } from "../resource/resource-tokens.mjs";
import type { IPokeApiSpecies } from "./species.mjs";

@Injectable()
export class ZSpeciesListService implements IZResourceListService<IZSpecies> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken)
    private _converter: IZConverter<IPokeApiSpecies[], IZSpecies[]>,
    @Inject(ZSearchToken)
    private _search: IZConverter<string | undefined, IZFilter | undefined>,
  ) {}

  public async list(request: IZDataRequest): Promise<IZPage<IZSpecies>> {
    const search = await this._search.convert(request.search);
    const req = new ZDataRequestBuilder().copy(request).filter(search).build();
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
    const count = await this._dal.count(collection, req.filter);
    const species = await this._dal.read<IPokeApiSpecies>(collection, req);
    const data = await this._converter.convert(species);
    return new ZPageBuilder<IZSpecies>().data(data).count(count).build();
  }
}
