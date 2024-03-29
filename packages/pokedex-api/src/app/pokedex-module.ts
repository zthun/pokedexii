/* istanbul ignore file -- @preserve */
import { Inject, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ZEvolutionsModule } from '../evolution/evolutions-module';
import { ZPokemonModule } from '../pokemon/pokemon-module';
import { ZResourceModule } from '../resource/resource-module';
import { IZResourceSeedService, ZResourceSeedServiceToken } from '../resource/resource-seed-service';
import { ZSpeciesModule } from '../species/species-module';
import { ZTypesModule } from '../type/types-module';

@Module({
  imports: [
    ZSpeciesModule,
    ZPokemonModule,
    ZResourceModule,
    ZTypesModule,
    ZEvolutionsModule,
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 10, limit: 100 }] })
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }]
})
export class ZPokedexModule {
  public constructor(@Inject(ZResourceSeedServiceToken) private _resource: IZResourceSeedService) {}

  public onModuleInit() {
    return this._resource.seed();
  }
}
