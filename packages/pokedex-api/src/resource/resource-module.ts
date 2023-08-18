import { Module } from '@nestjs/common';
import { ZHttpModule } from '@zthun/webigail-nest';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZResourceSeedService, ZResourceSeedServiceToken } from './resource-seed-service';

@Module({
  imports: [ZHttpModule, ZPokedexDatabaseModule],
  providers: [
    {
      provide: ZResourceSeedServiceToken,
      useClass: ZResourceSeedService
    },
    ZResourceSeedService
  ],
  exports: [ZResourceSeedServiceToken, ZResourceSeedService]
})
export class ZResourceModule {}
