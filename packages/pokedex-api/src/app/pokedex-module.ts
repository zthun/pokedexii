/* istanbul ignore file -- @preserve */
import { Inject, Module } from '@nestjs/common';
import { ZPokedexResourceModule } from '../resource/resource-module';
import { IZPokedexResourceService, ZPokedexResourceServiceToken } from '../resource/resource-service';
import { ZPokedexSpeciesModule } from '../species/species-module';

@Module({
  imports: [ZPokedexSpeciesModule, ZPokedexResourceModule]
})
export class ZPokedexModule {
  public constructor(@Inject(ZPokedexResourceServiceToken) private _resource: IZPokedexResourceService) {}

  public onModuleInit() {
    return this._resource.seed();
  }
}
