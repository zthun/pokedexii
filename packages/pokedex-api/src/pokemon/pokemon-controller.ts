import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZPokemon } from '@zthun/pokedex';
import { IZResourceGetService, IZResourceListService } from '../resource/resource-service';
import { ZGetToken, ZListToken } from '../resource/resource-tokens';

@Controller('pokemon')
export class ZPokedexPokemonController {
  public constructor(
    @Inject(ZListToken) private _listService: IZResourceListService<IZPokemon>,
    @Inject(ZGetToken) private _getService: IZResourceGetService<IZPokemon>
  ) {}

  @Get()
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZPokemon>> {
    return this._listService.list(new ZDataRequestBuilder().query(query).build());
  }

  @Get(':idOrName')
  public get(@Param('idOrName') idOrName: string): Promise<IZPokemon> {
    return this._getService.get(idOrName);
  }
}
