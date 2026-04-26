import { Module } from "@nestjs/common";

import { ZConverterIdOrNameSearch } from "../convert/converter-id-or-name-search.mjs";
import { ZPokedexDatabaseModule } from "../database/pokedex-database-module.mjs";
import {
  ZConvertToken,
  ZGetToken,
  ZListToken,
  ZSearchToken,
} from "../resource/resource-tokens.mjs";
import { ZPokemonController } from "./pokemon-controller.mjs";
import { ZPokemonConvert } from "./pokemon-convert.mjs";
import { ZPokemonGetService } from "./pokemon-get-service.mjs";
import { ZPokemonListService } from "./pokemon-list-service.mjs";

@Module({
  imports: [ZPokedexDatabaseModule],
  controllers: [ZPokemonController],
  providers: [
    {
      provide: ZGetToken,
      useClass: ZPokemonGetService,
    },
    {
      provide: ZListToken,
      useClass: ZPokemonListService,
    },
    {
      provide: ZSearchToken,
      useValue: new ZConverterIdOrNameSearch(),
    },
    {
      provide: ZConvertToken,
      useClass: ZPokemonConvert,
    },
  ],
})
export class ZPokemonModule {}
