import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZSpecies } from '@zthun/pokedex';
import { IZPokedexSpeciesService, ZPokedexSpeciesServiceToken } from './species-service';

@Controller('species')
export class ZPokedexSpeciesController {
  public constructor(@Inject(ZPokedexSpeciesServiceToken) private _service: IZPokedexSpeciesService) {}

  @Get()
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZSpecies>> {
    const request = new ZDataRequestBuilder().query(query).build();
    return this._service.list(request);
  }

  @Get(':idOrName')
  public get(@Param('idOrName') idOrName: string): Promise<IZSpecies> {
    return this._service.get(idOrName);
  }
}
