import { Error } from '@mui/icons-material';
import { CircularProgress, Pagination } from '@mui/material';
import { IZDataRequest, IZPokemon, ZDataRequestBuilder } from '@zthun/pokedex';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonCount, usePokemonPage } from '../pokemon/pokemon-service';
import { isStateErrored, isStateLoaded, isStateLoading } from '../state/use-async-state';
import { makeStyles } from '../theme/make-styles';
import { cssClass } from '../util/css-class';
import { ZPokedexSearch } from './pokedex-search';
import { ZPokemonCard } from './pokemon-card';

export interface IZPokedexListPage {
  size?: number;
}

const usePokedexListStyles = makeStyles()((theme) => ({
  grid: {
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: '1fr 1fr 1fr',
    paddingTop: '6rem',
    paddingBottom: '3rem'
  },

  navigation: {
    backgroundColor: theme.palette.grey[300],
    position: 'fixed',
    zIndex: 10,
    left: 0,
    right: 0,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    padding: '0.5rem'
  }
}));

export function ZPokedexListPage(props: IZPokedexListPage) {
  const { size = 21 } = props;
  const [request, setRequest] = useState<IZDataRequest>(new ZDataRequestBuilder().page(1).size(size).build());
  const [pokemon] = usePokemonPage(request);
  const [count] = usePokemonCount(request);
  const { classes } = usePokedexListStyles();
  const navigate = useNavigate();

  function renderNavigation() {
    if (!isStateLoaded(count)) {
      return null;
    }

    const { page } = request;
    const remainder = count % size === 0 ? 0 : 1;
    const pages = Math.floor(count / size) + remainder;

    const handlePageChange = (_: any, page: number) => {
      const next = new ZDataRequestBuilder().copy(request).page(page).build();
      setRequest(next);
    };

    const handleSearch = (value: string) => {
      const next = new ZDataRequestBuilder().copy(request).page(1).search(value).build();
      setRequest(next);
    };

    return (
      <div className={cssClass('ZPokedexListPage-navigation', classes.navigation)}>
        <Pagination
          className={cssClass('ZPokedexListPage-pagination')}
          count={pages}
          page={page}
          onChange={handlePageChange}
        />
        <ZPokedexSearch value={request.search} onCommit={handleSearch} />
      </div>
    );
  }

  function renderPokemon(pokemon: IZPokemon) {
    const handleClick = () => navigate(`/pokemon/${pokemon.name}`);
    return <ZPokemonCard key={pokemon.name} value={pokemon} onClick={handleClick} />;
  }

  function renderPokemonList() {
    if (isStateLoading(pokemon)) {
      return <CircularProgress className='ZPokedexListPage-loading' size='3rem' />;
    }

    if (isStateErrored(pokemon)) {
      // TODO Better error handling here.
      return <Error className='ZPokedexListPage-error' />;
    }

    return pokemon.map(renderPokemon);
  }

  return (
    <div className={cssClass('ZPokedexListPage-root')}>
      {renderNavigation()}
      <div className={cssClass('ZPokedexListPage-grid', classes.grid)} data-page={request.page}>
        {renderPokemonList()}
      </div>
    </div>
  );
}
