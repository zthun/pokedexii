import { Module } from '@nestjs/common';
import { ZConverterIdOrNameSearch } from '../convert/converter-id-or-name-search.mjs';
import { ZConverterList } from '../convert/converter-list.mjs';
import { ZPokedexDatabaseModule } from '../database/pokedex-database-module.mjs';
import { ZConvertToken, ZGetToken, ZListToken, ZSearchToken } from '../resource/resource-tokens.mjs';
import { ZEvolutionConvert } from './evolution-convert.mjs';
import { ZEvolutionsController } from './evolutions-controller.mjs';
import { ZEvolutionsGetService } from './evolutions-get-service.mjs';
import { ZEvolutionsListService } from './evolutions-list-service.mjs';

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
