import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IZPokemon } from '@zthun/pokedex';
import { IZPokedexPokemonService, ZPokedexPokemonServiceToken } from './pokemon-service';

@Controller('pokemon')
export class ZPokedexPokemonController {
  public constructor(@Inject(ZPokedexPokemonServiceToken) private _service: IZPokedexPokemonService) {}

  @Get(':idOrName')
  public get(@Param('idOrName') idOrName: string): Promise<IZPokemon> {
    return this._service.get(idOrName);
  }
}
