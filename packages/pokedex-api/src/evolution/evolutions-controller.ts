import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZEvolution } from '@zthun/pokedex';
import { IZResourceGetService, IZResourceListService } from '../resource/resource-service';
import { ZGetToken, ZListToken } from '../resource/resource-tokens';

@Controller('evolutions')
export class ZEvolutionsController {
  public constructor(
    @Inject(ZListToken) private _listService: IZResourceListService<IZEvolution>,
    @Inject(ZGetToken) private _getService: IZResourceGetService<IZEvolution>
  ) {}

  @Get()
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZEvolution>> {
    return this._listService.list(new ZDataRequestBuilder().query(query).build());
  }

  @Get(':idOrName')
  public get(@Param('idOrName') idOrName: string): Promise<IZEvolution> {
    return this._getService.get(idOrName);
  }
}
