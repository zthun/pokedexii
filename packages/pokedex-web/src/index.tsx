import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZPokedexApp } from './pokedex-app/pokedex-app';

const container = createRoot(document.getElementById('zthunworks-pokedex')!);

container.render(
  <React.StrictMode>
    <ZPokedexApp />
  </React.StrictMode>
);
