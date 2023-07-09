import { ZGridView, useNavigate } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZPokemon } from '@zthun/pokedex';
import React from 'react';
import { ZPokemonCard } from './pokemon-card';
import { usePokemonService } from './pokemon-service';

export interface IZPokedexListPage {}

export function ZPokedexListPage() {
  const service = usePokemonService();
  const navigate = useNavigate();

  function renderPokemon(pokemon: IZPokemon) {
    const handleClick = () => navigate(`/pokemon/${pokemon.name}`);
    return <ZPokemonCard key={pokemon.id} value={pokemon} onClick={handleClick} />;
  }

  return (
    <ZGridView
      className={cssJoinDefined('ZPokedexListPage-root')}
      dataSource={service}
      renderItem={renderPokemon}
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
