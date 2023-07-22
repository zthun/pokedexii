import {
  ZBreadcrumbsOutlet,
  ZFullScreen,
  ZGrid,
  ZGridSpan,
  ZNotFound,
  ZSuspenseRotate,
  useLocation,
  useParams
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { isStateErrored, isStateLoading } from '@zthun/helpful-react';
import React, { useEffect, useState } from 'react';
import { ZEvolutionChainCard } from '../evolution/evolution-chain-card';
import { ZPokemonAttributesCard } from '../pokemon/pokemon-attributes-card';
import { ZPokemonStatsCard } from '../pokemon/pokemon-stats-card';
import { useSpecies } from './species-service';
import { ZSpeciesVarietiesCard } from './species-varieties-card';

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
      <ZGrid justifyContent='center' columns='auto auto 1fr' columnsMd='1fr 1fr' columnsSm='1fr' gap={ZSizeFixed.Small}>
        <ZSpeciesVarietiesCard speciesName={name} value={variety} onValueChange={setVariety} />
        <ZPokemonAttributesCard pokemonName={pokemon} />
        <ZPokemonStatsCard pokemonName={pokemon} />
        <ZGridSpan columnStart={1} columnEnd={3} columnStartMd='unset' columnEndMd='unset'>
          <ZEvolutionChainCard evolutionName={String(species.evolution)} />
        </ZGridSpan>
      </ZGrid>
    );
  };

  return (
    <div className='ZSpeciesDetailsPage-root' data-name={name}>
      <ZBreadcrumbsOutlet />
      {renderPage()}
    </div>
  );
}
