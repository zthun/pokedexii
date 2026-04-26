import { ZGridView, ZSearch } from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZDataRequestBuilder, ZSortBuilder } from "@zthun/helpful-query";
import type { IZType } from "@zthun/pokedex";
import { useState } from "react";

import { ZTypeCard } from "./type-card.js";
import { useTypeService } from "./type-service.mjs";

const DefaultRequest = new ZDataRequestBuilder()
  .sort(new ZSortBuilder().ascending("name").build())
  .build();

export function ZTypeListPage() {
  const service = useTypeService();
  const [template, setTemplate] = useState(DefaultRequest);

  const renderType = (t: IZType) => {
    return <ZTypeCard key={t.name} value={t} />;
  };

  return (
    <ZGridView
      className="ZTypeListPage-root"
      GridProps={{
        gap: ZSizeFixed.Small,
        columns: {
          xl: "1fr 1fr 1fr 1fr",
          lg: "1fr 1fr 1fr",
          md: "1fr 1fr",
          sm: "1fr",
        },
      }}
      heading={
        <ZSearch value={template} onValueChange={setTemplate} name="search" />
      }
      dataSource={service}
      renderItem={renderType}
      value={template}
    />
  );
}
