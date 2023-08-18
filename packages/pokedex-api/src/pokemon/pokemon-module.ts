import { Module } from '@nestjs/common';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZPokedexPokemonController } from './pokemon-controller';
import { ZPokedexPokemonService, ZPokedexPokemonServiceToken } from './pokemon-service';

@Module({
  imports: [ZPokedexDatabaseModule],
  controllers: [ZPokedexPokemonController],
  providers: [
    {
      provide: ZPokedexPokemonServiceToken,
      useClass: ZPokedexPokemonService
    }
  ]
})
export class ZPokedexPokemonModule {}
