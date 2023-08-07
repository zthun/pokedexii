import {
  ZBannerMain,
  ZCaption,
  ZDrawerButton,
  ZFashionThemeContext,
  ZH1,
  ZIconFontAwesome,
  ZImageSource,
  ZList,
  ZListLineItem,
  ZNavigate,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  useNavigate
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZHorizontalAnchor } from '@zthun/helpful-fn';
import React, { useState } from 'react';
import { ZSpeciesDetailsPage } from '../species/species-details-page';
import { ZSpeciesListPage } from '../species/species-list-page';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZTypeListPage } from '../type/type-list-page';

const PokemonTheme = createPokemonTheme();

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the pokedex web application.
 */
export function ZPokedexApp() {
  const avatar = <ZImageSource src='/png/pokeball-512x512.png' width={ZSizeFixed.Medium} />;
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const _navigate = (route: string) => {
    navigate(route);
    setDate(new Date());
  };

  const prefix = (
    <div className='ZPokedexApp-title'>
      <ZH1 compact>Pokedexii</ZH1>
      <ZCaption compact>{`Catch Em' All`}</ZCaption>
    </div>
  );

  const suffix = (
    <ZDrawerButton
      className='ZPokedexApp-drawer'
      DrawerProps={{ anchor: ZHorizontalAnchor.Right }}
      closeOnChange={[date]}
    >
      <ZList>
        <ZListLineItem
          heading='Pokemon'
          subHeading='Pokemon Species List'
          prefix={<ZIconFontAwesome name='spaghetti-monster-flying' width={ZSizeFixed.Small} />}
          onClick={_navigate.bind(null, '/pokemon')}
        />
        <ZListLineItem
          heading='Types'
          subHeading='Type Matchup Charts'
          prefix={<ZIconFontAwesome name='bolt' width={ZSizeFixed.Small} />}
          onClick={_navigate.bind(null, '/types')}
        />
      </ZList>
    </ZDrawerButton>
  );

  return (
    <ZFashionThemeContext.Provider value={PokemonTheme}>
      <ZBannerMain avatar={avatar} prefix={prefix} suffix={suffix}>
        <ZRouteMap>
          <ZRoute path='/pokemon/:name' element={<ZSpeciesDetailsPage />} />
          <ZRoute path='/pokemon' element={<ZSpeciesListPage />} />
          <ZRoute path='/types' element={<ZTypeListPage />} />
          <ZRoute path='' element={<ZNavigate to='/pokemon' />} />
          <ZRoute path='*' element={<ZNotFound />} />
        </ZRouteMap>
      </ZBannerMain>
    </ZFashionThemeContext.Provider>
  );
}
