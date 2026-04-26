import { Module } from "@nestjs/common";

import { ZConverterList } from "../convert/converter-list.mjs";
import { ZPokedexDatabaseModule } from "../database/pokedex-database-module.mjs";
import {
  ZConvertToken,
  ZGetToken,
  ZListToken,
  ZSearchToken,
} from "../resource/resource-tokens.mjs";
import { ZSpeciesController } from "./species-controller.mjs";
import { ZSpeciesConverter } from "./species-convert.mjs";
import { ZSpeciesGetService } from "./species-get-service.mjs";
import { ZSpeciesListService } from "./species-list-service.mjs";
import { ZSpeciesSearch } from "./species-search.mjs";

@Module({
  imports: [ZPokedexDatabaseModule],
  controllers: [ZSpeciesController],
  providers: [
    {
      provide: ZListToken,
      useClass: ZSpeciesListService,
    },
    {
      provide: ZGetToken,
      useClass: ZSpeciesGetService,
    },
    {
      provide: ZSearchToken,
      useClass: ZSpeciesSearch,
    },
    {
      provide: ZConvertToken,
      useValue: new ZConverterList(new ZSpeciesConverter()),
    },
  ],
})
export class ZSpeciesModule {}
