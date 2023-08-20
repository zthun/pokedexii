import { Module } from '@nestjs/common';
import { ZConverterList } from '../convert/converter-list';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZConvertToken, ZGetToken, ZListToken, ZSearchToken } from '../resource/resource-tokens';
import { ZSpeciesController } from './species-controller';
import { ZSpeciesConverter } from './species-convert';
import { ZSpeciesGetService } from './species-get-service';
import { ZSpeciesListService } from './species-list-service';
import { ZSpeciesSearch } from './species-search';

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
      useClass: ZSpeciesSearch
    },
    {
      provide: ZConvertToken,
      useValue: new ZConverterList(new ZSpeciesConverter())
    }
  ]
})
export class ZSpeciesModule {}
