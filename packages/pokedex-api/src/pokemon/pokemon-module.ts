import { Module } from '@nestjs/common';
import { ZConverterIdOrNameSearch } from 'src/convert/converter-id-or-name-search';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZConvertToken, ZGetToken, ZListToken, ZSearchToken } from '../resource/resource-tokens';
import { ZPokedexPokemonController } from './pokemon-controller';
import { ZPokemonConvert } from './pokemon-convert';
import { ZPokemonGetService } from './pokemon-get-service';
import { ZPokemonListService } from './pokemon-list-service';

@Module({
  imports: [ZPokedexDatabaseModule],
  controllers: [ZPokedexPokemonController],
  providers: [
    {
      provide: ZGetToken,
      useClass: ZPokemonGetService
    },
    {
      provide: ZListToken,
      useClass: ZPokemonListService
    },
    {
      provide: ZSearchToken,
      useValue: new ZConverterIdOrNameSearch()
    },
    {
      provide: ZConvertToken,
      useClass: ZPokemonConvert
    }
  ]
})
export class ZPokedexPokemonModule {}
