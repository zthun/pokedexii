/* istanbul ignore file -- @preserve */
import { Inject, Module } from '@nestjs/common';
import { ZPokedexCollection } from 'src/database/pokedex-database';
import { ZPokedexResourceModule } from '../resource/resource-module';
import { IZPokedexResourceService, ZPokedexResourceServiceToken } from '../resource/resource-service';
import { ZPokedexSpeciesModule } from '../species/species-module';

@Module({
  imports: [ZPokedexSpeciesModule, ZPokedexResourceModule]
})
export class ZPokedexModule {
  public constructor(@Inject(ZPokedexResourceServiceToken) private _resource: IZPokedexResourceService) {}

  public async onModuleInit() {
    const values = Object.values(ZPokedexCollection);

    for (let i = 0; i < values.length; ++i) {
      const resource = values[i];
      await this._resource.populate(resource);
    }
  }
}
