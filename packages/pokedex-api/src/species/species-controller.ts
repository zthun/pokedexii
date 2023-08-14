import { Controller, Get } from '@nestjs/common';
import { IZSpecies } from '@zthun/pokedex';

@Controller('species')
export class ZSpeciesController {
  @Get()
  public read(): Promise<IZSpecies> {
    return Promise.reject('Not yet implemented');
  }
}
