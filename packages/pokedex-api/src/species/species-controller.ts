import { Controller, Get, Inject } from '@nestjs/common';
import { IZSpecies } from '@zthun/pokedex';
import { IZPokedexSpeciesService, ZPokedexSpeciesServiceToken } from './species-service';

@Controller('species')
export class ZPokedexSpeciesController {
  public constructor(@Inject(ZPokedexSpeciesServiceToken) private _service: IZPokedexSpeciesService) {}

  @Get()
  public list(): Promise<IZSpecies[]> {
    return this._service.list();
  }
}
