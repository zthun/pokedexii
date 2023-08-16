import { Module } from '@nestjs/common';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZPokedexResourceModule } from '../resource/resource-module';
import { ZPokedexSpeciesController } from './species-controller';
import { ZPokedexSpeciesService, ZPokedexSpeciesServiceToken } from './species-service';

@Module({
  imports: [ZPokedexDatabaseModule, ZPokedexResourceModule],
  controllers: [ZPokedexSpeciesController],
  providers: [
    ZPokedexSpeciesService,
    {
      provide: ZPokedexSpeciesServiceToken,
      useClass: ZPokedexSpeciesService
    }
  ]
})
export class ZPokedexSpeciesModule {}
