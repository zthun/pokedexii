/* istanbul ignore file -- @preserve */
import { Inject, Module } from '@nestjs/common';
import { ZPokedexPokemonModule } from '../pokemon/pokemon-module';
import { ZResourceModule } from '../resource/resource-module';
import { IZResourceSeedService, ZResourceSeedServiceToken } from '../resource/resource-seed-service';
import { ZSpeciesModule } from '../species/species-module';

@Module({
  imports: [ZSpeciesModule, ZPokedexPokemonModule, ZResourceModule]
})
export class ZPokedexModule {
  public constructor(@Inject(ZResourceSeedServiceToken) private _resource: IZResourceSeedService) {}

  public onModuleInit() {
    return this._resource.seed();
  }
}
