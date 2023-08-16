import { Module } from '@nestjs/common';
import { ZHttpModule } from '@zthun/webigail-nest';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZPokedexResourceService, ZPokedexResourceServiceToken } from './resource-service';

@Module({
  imports: [ZHttpModule, ZPokedexDatabaseModule],
  providers: [
    {
      provide: ZPokedexResourceServiceToken,
      useClass: ZPokedexResourceService
    },
    ZPokedexResourceService
  ],
  exports: [ZPokedexResourceServiceToken, ZPokedexResourceService]
})
export class ZPokedexResourceModule {}
