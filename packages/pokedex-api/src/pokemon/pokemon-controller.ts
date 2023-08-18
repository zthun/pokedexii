import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IZPokemon } from '@zthun/pokedex';
import { IZResourceGetService } from '../resource/resource-service';
import { ZGetToken } from '../resource/resource-tokens';

@Controller('pokemon')
export class ZPokedexPokemonController {
  public constructor(@Inject(ZGetToken) private _getService: IZResourceGetService<IZPokemon>) {}

  @Get(':idOrName')
  public get(@Param('idOrName') idOrName: string): Promise<IZPokemon> {
    return this._getService.get(idOrName);
  }
}
