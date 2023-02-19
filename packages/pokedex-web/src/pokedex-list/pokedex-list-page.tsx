import { Error } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';
import { IZDataRequest, IZPokemon, ZDataRequestBuilder } from '@zthun/pokedex';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonPage } from '../pokemon/pokemon-service';
import { isStateErrored, isStateLoading } from '../state/use-async-state';
import { makeStyles } from '../theme/make-styles';
import { cssClass } from '../util/css-class';
import { ZPokemonCard } from './pokemon-card';

const usePokedexListStyles = makeStyles()((theme) => ({
  grid: {
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: '1fr 1fr 1fr'
  }
}));

export function ZPokedexListPage() {
  const [request] = useState<IZDataRequest>(new ZDataRequestBuilder().page(1).size(150).build());
  const [pokemon] = usePokemonPage(request);
  const styles = usePokedexListStyles();
  const className = cssClass('ZPokedexListPage-root', styles.classes.grid);
  const navigate = useNavigate();

  function renderPokemon(pokemon: IZPokemon) {
    const handleClick = () => navigate(`/pokemon/${pokemon.name}`);
    return <ZPokemonCard key={pokemon.name} pokemon={pokemon} onClick={handleClick} />;
  }

  function renderPokemonList() {
    if (isStateLoading(pokemon)) {
      return <LinearProgress className='ZPokedexListPage-loading' />;
    }

    if (isStateErrored(pokemon)) {
      // TODO Better error handling here.
      return <Error className='ZPokedexListPage-error' />;
    }

    return pokemon.map(renderPokemon);
  }

  return <div className={className}>{renderPokemonList()}</div>;
}
