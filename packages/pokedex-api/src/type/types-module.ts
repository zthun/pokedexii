import { Module } from '@nestjs/common';
import { ZConverterIdOrNameSearch } from '../convert/converter-id-or-name-search';
import { ZConverterList } from '../convert/converter-list';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZConvertToken, ZGetToken, ZListToken, ZSearchToken } from '../resource/resource-tokens';
import { ZTypeConvert } from './type-convert';
import { ZTypesController } from './types-controller';
import { ZTypesGetService } from './types-get-service';
import { ZTypesListService } from './types-list-service';

@Module({
  imports: [ZPokedexDatabaseModule],
  controllers: [ZTypesController],
  providers: [
    {
      provide: ZSearchToken,
      useValue: new ZConverterIdOrNameSearch()
    },
    {
      provide: ZConvertToken,
      useValue: new ZConverterList(new ZTypeConvert())
    },
    {
      provide: ZListToken,
      useClass: ZTypesListService
    },
    {
      provide: ZGetToken,
      useClass: ZTypesGetService
    }
  ]
})
export class ZTypesModule {}
