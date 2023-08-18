import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZSpecies } from '@zthun/pokedex';
import { IZResourceGetService, IZResourceListService } from 'src/resource/resource-service';
import { ZGetToken, ZListToken } from 'src/resource/resource-tokens';

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

  @Get(':idOrName')
  public get(@Param('idOrName') idOrName: string): Promise<IZSpecies> {
    return this._getService.get(idOrName);
  }
}
