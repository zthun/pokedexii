import { ZGridView, useNavigate } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZSpecies } from '@zthun/pokedex';
import React from 'react';
import { ZSpeciesCard } from './species-card';
import { useSpeciesService } from './species-service';

export function ZSpeciesListPage() {
  const service = useSpeciesService();
  const navigate = useNavigate();

  function renderSpecies(species: IZSpecies) {
    const handleClick = () => navigate(`/pokemon/${species.name}`);
    return <ZSpeciesCard key={species.id} value={species.name} onClick={handleClick} />;
  }

  return (
    <ZGridView
      className={cssJoinDefined('ZSpeciesListPage-root')}
      dataSource={service}
      renderItem={renderSpecies}
      GridProps={{
        gap: ZSizeFixed.Small,
        columns: '1fr 1fr 1fr 1fr 1fr 1fr',
        columnsLg: '1fr 1fr 1fr 1fr',
        columnsMd: '1fr 1fr 1fr',
        columnsSm: '1fr 1fr',
        columnsXs: '1fr'
      }}
    />
  );
}
