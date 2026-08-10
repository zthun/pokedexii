import {
  useNavigate,
  ZGridView,
  ZPagination,
  ZSearch,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { ZDataRequestBuilder } from "@zthun/helpful-query";
import type { IZSpecies } from "@zthun/pokedex";
import { useState } from "react";

import { ZSpeciesCard } from "./species-card.js";
import { useSpeciesService } from "./species-service.mjs";

export function ZSpeciesListPage() {
  const service = useSpeciesService();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(() =>
    new ZDataRequestBuilder().size(96).build(),
  );

  function renderSpecies(species: IZSpecies) {
    const handleClick = () => navigate(`/pokemon/${species.name}`);
    return (
      <ZSpeciesCard key={species.id} species={species} onClick={handleClick} />
    );
  }

  return (
    <ZGridView
      className={cssJoinDefined("ZSpeciesListPage-root")}
      dataSource={service}
      renderItem={renderSpecies}
      value={template}
      heading={
        <ZSearch value={template} onValueChange={setTemplate} name="search" />
      }
      footer={
        <ZPagination
          dataSource={service}
          value={template}
          onValueChange={setTemplate}
        />
      }
      GridProps={{
        gap: ZSizeFixed.Small,
        columns: {
          xl: "1fr 1fr 1fr 1fr",
          lg: "1fr 1fr 1fr",
          md: "1fr 1fr",
          sm: "1fr",
        },
      }}
    />
  );
}
