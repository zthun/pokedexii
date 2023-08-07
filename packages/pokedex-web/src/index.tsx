import { ZRouter } from '@zthun/fashion-boutique';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZPokedexApp } from './app/app';

const container = createRoot(document.getElementById('zthunworks-pokedex')!);

container.render(
  <React.StrictMode>
    <ZRouter>
      <ZPokedexApp />
    </ZRouter>
  </React.StrictMode>
);
