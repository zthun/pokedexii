import { Module } from "@nestjs/common";

import { ZConverterIdOrNameSearch } from "../convert/converter-id-or-name-search.mjs";
import { ZConverterList } from "../convert/converter-list.mjs";
import { ZPokedexDatabaseModule } from "../database/pokedex-database-module.mjs";
import {
  ZConvertToken,
  ZGetToken,
  ZListToken,
  ZSearchToken,
} from "../resource/resource-tokens.mjs";
import { ZTypeConvert } from "./type-convert.mjs";
import { ZTypesController } from "./types-controller.mjs";
import { ZTypesGetService } from "./types-get-service.mjs";
import { ZTypesListService } from "./types-list-service.mjs";

@Module({
  imports: [ZPokedexDatabaseModule],
  controllers: [ZTypesController],
  providers: [
    {
      provide: ZSearchToken,
      useValue: new ZConverterIdOrNameSearch(),
    },
    {
      provide: ZConvertToken,
      useValue: new ZConverterList(new ZTypeConvert()),
    },
    {
      provide: ZListToken,
      useClass: ZTypesListService,
    },
    {
      provide: ZGetToken,
      useClass: ZTypesGetService,
    },
  ],
})
export class ZTypesModule {}
