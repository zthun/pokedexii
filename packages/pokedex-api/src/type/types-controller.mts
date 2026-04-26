import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import type { IZDataRequestQuery, IZPage } from "@zthun/helpful-query";
import { ZDataRequestBuilder } from "@zthun/helpful-query";
import type { IZType } from "@zthun/pokedex";

import type {
  IZResourceGetService,
  IZResourceListService,
} from "../resource/resource-service.mjs";
import { ZGetToken, ZListToken } from "../resource/resource-tokens.mjs";

@ApiTags("Types")
@Controller("types")
export class ZTypesController {
  public constructor(
    @Inject(ZListToken) private _listService: IZResourceListService<IZType>,
    @Inject(ZGetToken) private _getService: IZResourceGetService<IZType>,
  ) {}

  @Get()
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZType>> {
    return this._listService.list(
      new ZDataRequestBuilder().query(query).build(),
    );
  }

  @ApiParam({
    type: "string",
    name: "identification",
    description: "The id or name of the type",
  })
  @Get(":identification")
  public get(@Param("identification") identification: string): Promise<IZType> {
    return this._getService.get(identification);
  }
}
