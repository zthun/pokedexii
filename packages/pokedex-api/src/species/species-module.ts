import { Module } from '@nestjs/common';
import { ZConverterIdOrNameSearch } from '../convert/converter-id-or-name-search';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZConvertToken, ZGetToken, ZListToken, ZSearchToken } from '../resource/resource-tokens';
import { ZSpeciesController } from './species-controller';
import { ZSpeciesConverter } from './species-convert';
import { ZSpeciesGetService } from './species-get-service';
import { ZSpeciesListService } from './species-list-service';

@Module({
  imports: [ZPokedexDatabaseModule],
  controllers: [ZSpeciesController],
  providers: [
    {
      provide: ZListToken,
      useClass: ZSpeciesListService
    },
    {
      provide: ZGetToken,
      useClass: ZSpeciesGetService
    },
    {
      provide: ZSearchToken,
      useValue: new ZConverterIdOrNameSearch()
    },
    {
      provide: ZConvertToken,
      useClass: ZSpeciesConverter
    }
  ]
})
export class ZSpeciesModule {}
