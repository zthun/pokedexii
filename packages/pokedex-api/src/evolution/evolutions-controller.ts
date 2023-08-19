import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZEvolution } from '@zthun/pokedex';
import { IZResourceGetService, IZResourceListService } from '../resource/resource-service';
import { ZGetToken, ZListToken } from '../resource/resource-tokens';

@ApiTags('Evolutions')
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

  @ApiParam({ type: 'number', name: 'identification', description: 'The id of the evolution' })
  @Get(':identification')
  public get(@Param('identification') identification: string): Promise<IZEvolution> {
    return this._getService.get(identification);
  }
}
