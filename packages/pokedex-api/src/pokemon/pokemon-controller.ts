import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZPokemon } from '@zthun/pokedex';
import { IZResourceGetService, IZResourceListService } from '../resource/resource-service';
import { ZGetToken, ZListToken } from '../resource/resource-tokens';

@ApiTags('Pokemon')
@Controller('pokemon')
export class ZPokemonController {
  public constructor(
    @Inject(ZListToken) private _listService: IZResourceListService<IZPokemon>,
    @Inject(ZGetToken) private _getService: IZResourceGetService<IZPokemon>
  ) {}

  @Get()
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZPokemon>> {
    return this._listService.list(new ZDataRequestBuilder().query(query).build());
  }

  @ApiParam({ type: 'string', name: 'identification' })
  @Get(':identification')
  public get(@Param('identification') identification: string): Promise<IZPokemon> {
    return this._getService.get(identification);
  }
}
