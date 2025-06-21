import {
  ZBreadcrumbsOutlet,
  ZFullScreen,
  ZGrid,
  ZGridSpan,
  ZNotFound,
  ZSuspenseRotate,
  useLocation,
  useParams,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { isStateErrored, isStateLoading } from "@zthun/helpful-react";
import { useEffect, useState } from "react";
import { ZEvolutionChainCard } from "../evolution/evolution-chain-card.js";
import { ZPokemonAttributesCard } from "../pokemon/pokemon-attributes-card.js";
import { ZPokemonStatsCard } from "../pokemon/pokemon-stats-card.js";
import { useSpecies } from "./species-service.mjs";
import { ZSpeciesVarietiesCard } from "./species-varieties-card.js";

/**
 * Represents the page for pokemon details.
 */
export function ZSpeciesDetailsPage() {
  const { name } = useParams();
  const location = useLocation();
  const [species] = useSpecies(name);
  const [variety, setVariety] = useState(0);

  useEffect(() => {
    setVariety(0);
  }, [location]);

  const renderPage = () => {
    if (!name) {
      return <ZNotFound />;
    }

    if (isStateLoading(species)) {
      return (
        <ZFullScreen>
          <ZSuspenseRotate width={ZSizeFixed.ExtraLarge} />
        </ZFullScreen>
      );
    }

    if (isStateErrored(species)) {
      return <ZNotFound />;
    }

    const pokemon = species.varieties[variety] || species.main;

    return (
      <ZGrid
        justify={{ content: "center" }}
        columns={{ xl: "auto auto 1fr", md: "1fr 1fr", sm: "1fr" }}
        gap={ZSizeFixed.Small}
      >
        <ZSpeciesVarietiesCard
          speciesName={name}
          value={variety}
          onValueChange={setVariety}
        />
        <ZPokemonAttributesCard pokemonName={pokemon} />
        <ZPokemonStatsCard pokemonName={pokemon} />
        <ZGridSpan
          columnStart={{ xl: 1, md: "unset" }}
          columnEnd={{ xl: 4, md: "unset" }}
        >
          <ZEvolutionChainCard evolutionName={String(species.evolution)} />
        </ZGridSpan>
      </ZGrid>
    );
  };

  return (
    <div className="ZSpeciesDetailsPage-root" data-name={name}>
      <ZBreadcrumbsOutlet />
      {renderPage()}
    </div>
  );
}
