import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZType } from '@zthun/pokedex';
import { IZResourceGetService, IZResourceListService } from '../resource/resource-service';
import { ZGetToken, ZListToken } from '../resource/resource-tokens';

@Controller('types')
export class ZTypesController {
  public constructor(
    @Inject(ZListToken) private _listService: IZResourceListService<IZType>,
    @Inject(ZGetToken) private _getService: IZResourceGetService<IZType>
  ) {}

  @Get()
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZType>> {
    return this._listService.list(new ZDataRequestBuilder().query(query).build());
  }

  @Get(':idOrName')
  public get(@Param('idOrName') idOrName: string): Promise<IZType> {
    return this._getService.get(idOrName);
  }
}
