/* istanbul ignore file -- @preserve */
import { Inject, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { ZEvolutionsModule } from "../evolution/evolutions-module.mjs";
import { ZPokemonModule } from "../pokemon/pokemon-module.mjs";
import { ZResourceModule } from "../resource/resource-module.mjs";
import type { IZResourceSeedService } from "../resource/resource-seed-service.mjs";
import { ZResourceSeedServiceToken } from "../resource/resource-seed-service.mjs";
import { ZSpeciesModule } from "../species/species-module.mjs";
import { ZTypesModule } from "../type/types-module.mjs";

@Module({
  imports: [
    ZSpeciesModule,
    ZPokemonModule,
    ZResourceModule,
    ZTypesModule,
    ZEvolutionsModule,
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 10, limit: 100 }] }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class ZPokedexModule {
  public constructor(
    @Inject(ZResourceSeedServiceToken) private _resource: IZResourceSeedService,
  ) {}

  public onModuleInit() {
    return this._resource.seed();
  }
}
