import {
  ZBox,
  ZCard,
  ZGrid,
  ZIconFontAwesome,
  ZImageSource,
  ZNotFound,
  ZStack,
  ZSuspenseRotate,
  useParams
} from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { asStateData, isStateErrored, isStateLoading } from '@zthun/helpful-react';
import { IZPokemon } from '@zthun/pokedex';
import { padStart, startCase } from 'lodash';
import React, { useMemo } from 'react';
import { ZPokemonAttributesCard } from '../pokemon/pokemon-attributes-card';
import { usePokemon } from '../pokemon/pokemon-service';
import { ZPokemonStatsCard } from '../pokemon/pokemon-stats-card';
import { usePokemonTheme } from '../theme/pokemon-theme';
import { useSpecies } from './species-service';

/**
 * Represents the page for pokemon details.
 */
export function ZSpeciesDetailsPage() {
  const { name } = useParams();
  const [species] = useSpecies(name);
  const [pokemon] = usePokemon(asStateData(species)?.main);

  const heading = useMemo(() => startCase(asStateData(pokemon)?.name), [pokemon]);
  const subHeading = useMemo(() => `#${padStart(String(asStateData(pokemon)?.id || '0'), 4, '0')}`, [pokemon]);
  const { component } = usePokemonTheme();

  const renderPokemon = (pokemon: IZPokemon) => (
    <ZCard
      className={cssJoinDefined('ZSpeciesDetailsPage-artwork')}
      heading={heading}
      subHeading={subHeading}
      name='pokemon'
      avatar={<ZIconFontAwesome name='palette' width={ZSizeFixed.Small} />}
    >
      <ZStack gap={ZSizeFixed.Small}>
        <ZBox fashion={component}>
          <ZImageSource src={pokemon.artwork} width={ZSizeVaried.Full} name='artwork' />
        </ZBox>
      </ZStack>
    </ZCard>
  );

  const renderPage = () => {
    if (!name) {
      return <ZNotFound />;
    }

    if (isStateLoading(species) || isStateLoading(pokemon)) {
      return <ZSuspenseRotate width={ZSizeFixed.ExtraLarge} />;
    }

    if (isStateErrored(species) || isStateErrored(pokemon)) {
      return <ZNotFound />;
    }

    return (
      <ZGrid justifyContent='center' columns='auto auto 1fr' columnsMd='1fr 1fr' columnsSm='1fr' gap={ZSizeFixed.Small}>
        {renderPokemon(pokemon)}
        <ZPokemonAttributesCard pokemonName={species.main} />
        <ZPokemonStatsCard pokemonName={species.main} />
      </ZGrid>
    );
  };

  return <div className='ZSpeciesDetailsPage-root'>{renderPage()}</div>;
}
