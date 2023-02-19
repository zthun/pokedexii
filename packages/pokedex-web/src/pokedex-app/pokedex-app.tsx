import { AppBar, Avatar, GlobalStyles, ThemeProvider, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ZPokedexDetailsPage } from '../pokedex-details/pokedex-details-page';
import { ZPokedexListPage } from '../pokedex-list/pokedex-list-page';
import { usePokedexTheme } from '../theme/make-styles';

const globalStyles = {
  body: {
    backgroundColor: 'whitesmoke',
    padding: '3rem',
    paddingTop: '8rem'
  }
};

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the pokedex web application.
 */
export function ZPokedexApp() {
  const theme = usePokedexTheme();
  const appBarStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr',
    alignItems: 'center',
    gap: '1rem',
    paddingLeft: '1rem',
    height: '4rem',

    h1: {
      fontSize: '2rem'
    }
  };

  return (
    <main className='ZPokedexApp-root' style={{ display: 'flex', justifyContent: 'center' }}>
      <GlobalStyles styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <AppBar sx={appBarStyles}>
          <Avatar src='/png/pokeball-512x512.png' />
          <Typography variant='h1'>Pokedexii</Typography>
        </AppBar>
        <HashRouter>
          <Routes>
            <Route path='/pokemon/:idOrName' element={<ZPokedexDetailsPage />} />
            <Route path='/pokemon' element={<ZPokedexListPage />} />
            <Route path='*' element={<Navigate to={'/pokemon'} />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </main>
  );
}
