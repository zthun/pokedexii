import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ZPokedexDetailsPage } from '../pokedex-details/pokedex-details-page';
import { ZPokedexListPage } from '../pokedex-list/pokedex-list-page';

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the pokedex web application.
 */
export function ZPokedexApp() {
  return (
    <main className='ZPokedexApp-root'>
      <HashRouter>
        <Routes>
          <Route path='/pokemon/:idOrName' element={<ZPokedexDetailsPage />} />
          <Route path='/pokemon' element={<ZPokedexListPage />} />
          <Route path='*' element={<Navigate to={'/pokemon'} />} />
        </Routes>
      </HashRouter>
    </main>
  );
}
