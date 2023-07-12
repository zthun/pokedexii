import { IZComponentValue, ZBox, ZButton, ZIconFontAwesome, ZImageSource } from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { asStateData, useAmbassadorState } from '@zthun/helpful-react';
import { IZPokemon, IZSpecies } from '@zthun/pokedex';
import { padStart, startCase } from 'lodash';
import React, { useMemo } from 'react';
import { usePokemon } from '../pokemon/pokemon-service';
import { ZResourceCard } from '../resource/resource-card';
import { usePokemonTheme } from '../theme/pokemon-theme';
import { IZSpeciesResourceCard } from './species-resource-card';
import { useSpecies } from './species-service';

export interface IZSpeciesVarietiesCard extends IZSpeciesResourceCard, IZComponentValue<number> {}

export function ZSpeciesVarietiesCard(props: IZSpeciesVarietiesCard) {
  const { speciesName, value, onValueChange } = props;
  const [species] = useSpecies(speciesName);
  const [index, setIndex] = useAmbassadorState(value, onValueChange, 0);
  const [pokemon] = usePokemon(asStateData(species)?.varieties?.at(index));
  const [main] = usePokemon(asStateData(species)?.main);
  const sprite = asStateData(main)?.artwork;
  const heading = useMemo(() => startCase(asStateData(species)?.name), [species]);
  const variety = useMemo(() => startCase(asStateData(pokemon)?.name), [pokemon]);
  const num = useMemo(() => `#${padStart(String(asStateData(pokemon)?.id || '0'), 4, '0')}`, [pokemon]);
  const subHeading = useMemo(() => `${num} ${variety}`, [variety, num]);

  const { component, primary, secondary } = usePokemonTheme();

  const renderContent = ([, pokemon]: [IZSpecies, IZPokemon]) => {
    const { artwork } = pokemon;

    return (
      <ZBox fashion={component}>
        <ZImageSource src={artwork} width={ZSizeVaried.Full} name='artwork' />
      </ZBox>
    );
  };

  const renderFooter = () => {
    const varieties = asStateData(species)?.varieties;
    const max = (varieties?.length || 0) - 1;
    const min = 0;

    return (
      <>
        <ZButton
          label={<ZIconFontAwesome name='arrow-left' width={ZSizeFixed.ExtraSmall} />}
          tooltip='Previous'
          width={ZSizeVaried.Full}
          disabled={index <= min}
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          fashion={secondary}
          name='previous'
        />
        <ZButton
          label={<ZIconFontAwesome name='arrow-right' width={ZSizeFixed.ExtraSmall} />}
          tooltip='Next'
          width={ZSizeVaried.Full}
          disabled={index >= max}
          onClick={() => setIndex((i) => Math.min(i + 1, varieties!.length - 1))}
          fashion={primary}
          name='next'
        />
      </>
    );
  };

  return (
    <div className='ZSpeciesVarietiesCard-root' data-name={speciesName} data-variety={asStateData(pokemon)?.name}>
      <ZResourceCard
        CardProps={{
          heading,
          subHeading,
          footer: renderFooter(),
          avatar: <ZImageSource src={sprite} width={ZSizeFixed.Medium} />
        }}
        resource={[species, pokemon, main]}
        name={speciesName}
      >
        {renderContent}
      </ZResourceCard>
    </div>
  );
}
