import { Module } from '@nestjs/common';
import { ZConverterIdOrNameSearch } from '../convert/converter-id-or-name-search';
import { ZConverterList } from '../convert/converter-list';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module';
import { ZConvertToken, ZGetToken, ZListToken, ZSearchToken } from '../resource/resource-tokens';
import { ZEvolutionConvert } from './evolution-convert';
import { ZEvolutionsController } from './evolutions-controller';
import { ZEvolutionsGetService } from './evolutions-get-service';
import { ZEvolutionsListService } from './evolutions-list-service';

@Module({
  imports: [ZPokedexDatabaseModule],
  controllers: [ZEvolutionsController],
  providers: [
    {
      provide: ZListToken,
      useClass: ZEvolutionsListService
    },
    {
      provide: ZGetToken,
      useClass: ZEvolutionsGetService
    },
    {
      provide: ZConvertToken,
      useValue: new ZConverterList(new ZEvolutionConvert())
    },
    {
      provide: ZSearchToken,
      useValue: new ZConverterIdOrNameSearch()
    }
  ]
})
export class ZEvolutionsModule {}
