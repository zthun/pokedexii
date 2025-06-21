import { Inject, Injectable } from "@nestjs/common";
import type { IZDatabaseDocument } from "@zthun/dalmart-db";
import type { IZDataRequest, IZFilter, IZPage } from "@zthun/helpful-query";
import { ZDataRequestBuilder, ZPageBuilder } from "@zthun/helpful-query";
import type { IZPokemon } from "@zthun/pokedex";
import type { IZConverter } from "../convert/converter.mjs";
import {
  ZDatabaseToken,
  ZPokedexCollection,
} from "../database/pokedex-database.mjs";
import type { IZResourceListService } from "../resource/resource-service.mjs";
import { ZConvertToken, ZSearchToken } from "../resource/resource-tokens.mjs";
import type { IPokeApiPokemon } from "./pokemon.mjs";

@Injectable()
export class ZPokemonListService implements IZResourceListService<IZPokemon> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken)
    private _converter: IZConverter<IPokeApiPokemon[], IZPokemon[]>,
    @Inject(ZSearchToken)
    private _search: IZConverter<string | undefined, IZFilter | undefined>,
  ) {}

  public async list(request: IZDataRequest): Promise<IZPage<IZPokemon>> {
    const search = await this._search.convert(request.search);
    const req = new ZDataRequestBuilder().copy(request).filter(search).build();
    const count = await this._dal.count(ZPokedexCollection.Pokemon, req.filter);
    const species = await this._dal.read<IPokeApiPokemon>(
      ZPokedexCollection.Pokemon,
      req,
    );
    const data = await this._converter.convert(species);
    return new ZPageBuilder<IZPokemon>().data(data).count(count).build();
  }
}
