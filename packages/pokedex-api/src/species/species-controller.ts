import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZSpecies } from '@zthun/pokedex';
import { IZResourceGetService, IZResourceListService } from '../resource/resource-service';
import { ZGetToken, ZListToken } from '../resource/resource-tokens';

@ApiTags('Species')
@Controller('species')
export class ZSpeciesController {
  public constructor(
    @Inject(ZListToken) private _listService: IZResourceListService<IZSpecies>,
    @Inject(ZGetToken) private _getService: IZResourceGetService<IZSpecies>
  ) {}

  @Get()
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZSpecies>> {
    return this._listService.list(new ZDataRequestBuilder().query(query).build());
  }

  @ApiParam({ type: 'string', name: 'identification' })
  @Get(':identification')
  public get(@Param('identification') identification: string): Promise<IZSpecies> {
    return this._getService.get(identification);
  }
}
