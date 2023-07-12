import { ZFullScreen, ZGrid, ZNotFound, ZSuspenseRotate, useParams } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { isStateErrored, isStateLoading } from '@zthun/helpful-react';
import React, { useState } from 'react';
import { ZPokemonAttributesCard } from '../pokemon/pokemon-attributes-card';
import { ZPokemonStatsCard } from '../pokemon/pokemon-stats-card';
import { useSpecies } from './species-service';
import { ZSpeciesVarietiesCard } from './species-varieties-card';

/**
 * Represents the page for pokemon details.
 */
export function ZSpeciesDetailsPage() {
  const { name } = useParams();
  const [species] = useSpecies(name);
  const [variety, setVariety] = useState(0);

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
      </ZGrid>
    );
  };

  return (
    <div className='ZSpeciesDetailsPage-root' data-name={name}>
      {renderPage()}
    </div>
  );
}
