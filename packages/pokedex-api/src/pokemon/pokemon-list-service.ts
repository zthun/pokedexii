import { Inject, Injectable } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { IZDataRequest, IZFilter, IZPage, ZDataRequestBuilder, ZPageBuilder } from '@zthun/helpful-query';
import { IZPokemon } from '@zthun/pokedex';
import { IZConverter } from '../convert/converter';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { IZResourceListService } from '../resource/resource-service';
import { ZConvertToken, ZSearchToken } from '../resource/resource-tokens';
import { IPokeApiPokemon } from './pokemon';

@Injectable()
export class ZPokemonListService implements IZResourceListService<IZPokemon> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken) private _converter: IZConverter<IPokeApiPokemon[], IZPokemon[]>,
    @Inject(ZSearchToken) private _search: IZConverter<string | undefined, IZFilter | undefined>
  ) {}

  public async list(request: IZDataRequest): Promise<IZPage<IZPokemon>> {
    const search = await this._search.convert(request.search);
    const req = new ZDataRequestBuilder().copy(request).filter(search).build();
    const count = await this._dal.count(ZPokedexCollection.Pokemon, req.filter);
    const species = await this._dal.read<IPokeApiPokemon>(ZPokedexCollection.Pokemon, req);
    const data = await this._converter.convert(species);
    return new ZPageBuilder<IZPokemon>().data(data).count(count).build();
  }
}
