import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZType } from '@zthun/pokedex';
import { IZResourceGetService, IZResourceListService } from '../resource/resource-service';
import { ZGetToken, ZListToken } from '../resource/resource-tokens';

@ApiTags('Types')
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

  @ApiParam({ type: 'string', name: 'identification' })
  @Get(':identification')
  public get(@Param('identification') identification: string): Promise<IZType> {
    return this._getService.get(identification);
  }
}
