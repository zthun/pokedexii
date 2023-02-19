import { Error } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';
import { IZDataRequest, IZPokemon, ZDataRequestBuilder } from '@zthun/pokedex';
import React, { useState } from 'react';
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

  function renderPokemon(pokemon: IZPokemon) {
    return <ZPokemonCard key={pokemon.name} pokemon={pokemon} />;
  }

  function renderPokemonList() {
    if (isStateLoading(pokemon)) {
      return <LinearProgress />;
    }

    if (isStateErrored(pokemon)) {
      // TODO Error handling here.
      return <Error />;
    }

    return pokemon.map(renderPokemon);
  }

  return <div className={className}>{renderPokemonList()}</div>;
}
