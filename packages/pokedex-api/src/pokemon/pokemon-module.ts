import { Module } from '@nestjs/common';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZPokedexResourceModule } from '../resource/resource-module';
import { ZPokedexPokemonController } from './pokemon-controller';
import { ZPokedexPokemonService, ZPokedexPokemonServiceToken } from './pokemon-service';

@Module({
  imports: [ZPokedexDatabaseModule, ZPokedexResourceModule],
  controllers: [ZPokedexPokemonController],
  providers: [
    ZPokedexPokemonService,
    {
      provide: ZPokedexPokemonServiceToken,
      useClass: ZPokedexPokemonService
    }
  ]
})
export class ZPokedexPokemonModule {}
