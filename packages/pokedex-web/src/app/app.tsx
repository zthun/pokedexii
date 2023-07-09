import {
  ZBannerMain,
  ZCaption,
  ZFashionThemeContext,
  ZH1,
  ZImageSource,
  ZNavigate,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  ZRouter
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React from 'react';
import { ZPokedexDetailsPage } from '../pokemon/pokemon-details-page';
import { ZPokedexListPage } from '../pokemon/pokemon-list-page';
import { createPokemonTheme } from '../theme/pokemon-theme';

const PokemonTheme = createPokemonTheme();

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the pokedex web application.
 */
export function ZPokedexApp() {
  const avatar = <ZImageSource src='/png/pokeball-512x512.png' width={ZSizeFixed.Medium} />;

  const prefix = (
    <div className='ZPokedexApp-title'>
      <ZH1 compact>Pokedexii</ZH1>
      <ZCaption compact>{`Catch Em' All`}</ZCaption>
    </div>
  );

  return (
    <ZRouter>
      <ZFashionThemeContext.Provider value={PokemonTheme}>
        <ZBannerMain avatar={avatar} prefix={prefix}>
          <ZRouteMap>
            <ZRoute path='/pokemon/:name' element={<ZPokedexDetailsPage />} />
            <ZRoute path='/pokemon' element={<ZPokedexListPage />} />
            <ZRoute path='' element={<ZNavigate to='/pokemon' />} />
            <ZRoute path='*' element={<ZNotFound />} />
          </ZRouteMap>
        </ZBannerMain>
      </ZFashionThemeContext.Provider>
    </ZRouter>
  );
}
