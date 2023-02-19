import { GlobalStyles, ThemeProvider } from '@mui/material';
import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ZPokedexDetailsPage } from '../pokedex-details/pokedex-details-page';
import { ZPokedexListPage } from '../pokedex-list/pokedex-list-page';
import { usePokedexTheme } from '../theme/make-styles';

const globalStyles = {
  body: {
    backgroundColor: 'whitesmoke',
    padding: '3rem'
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

  return (
    <main className='ZPokedexApp-root' style={{ display: 'flex', justifyContent: 'center' }}>
      <GlobalStyles styles={globalStyles} />
      <ThemeProvider theme={theme}>
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
