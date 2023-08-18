import { Module } from '@nestjs/common';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZConvertToken, ZGetToken } from '../resource/resource-tokens';
import { ZPokedexPokemonController } from './pokemon-controller';
import { ZPokemonConvert } from './pokemon-convert';
import { ZPokemonGetService } from './pokemon-get-service';

@Module({
  imports: [ZPokedexDatabaseModule],
  controllers: [ZPokedexPokemonController],
  providers: [
    {
      provide: ZGetToken,
      useClass: ZPokemonGetService
    },
    {
      provide: ZConvertToken,
      useClass: ZPokemonConvert
    }
  ]
})
export class ZPokedexPokemonModule {}
