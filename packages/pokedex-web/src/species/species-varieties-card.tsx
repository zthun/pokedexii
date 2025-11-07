import type { IZComponentValue } from "@zthun/fashion-boutique";
import {
  useFashionTheme,
  ZBox,
  ZButton,
  ZIconFontAwesome,
  ZImage,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { ZOrientation } from "@zthun/helpful-fn";
import { asStateData, useAmbassadorState } from "@zthun/helpful-react";
import type { IZPokemon, IZSpecies } from "@zthun/pokedex";
import { padStart, startCase } from "lodash-es";
import { useMemo } from "react";
import { usePokemon } from "../pokemon/pokemon-service.mjs";
import { ZResourceCard } from "../resource/resource-card.js";
import type { IZSpeciesResourceCard } from "./species-resource-card.mjs";
import { useSpecies } from "./species-service.mjs";

export interface IZSpeciesVarietiesCard
  extends IZSpeciesResourceCard,
    IZComponentValue<number> {}

export function ZSpeciesVarietiesCard(props: IZSpeciesVarietiesCard) {
  const { speciesName, value, onValueChange } = props;
  const [species] = useSpecies(speciesName);
  const [index, setIndex] = useAmbassadorState(value, onValueChange, 0);
  const [pokemon] = usePokemon(asStateData(species)?.varieties?.at(index));
  const [main] = usePokemon(asStateData(species)?.main);
  const sprite = asStateData(main)?.artwork;
  const heading = useMemo(
    () => startCase(asStateData(species)?.name),
    [species],
  );
  const variety = useMemo(
    () => startCase(asStateData(pokemon)?.name),
    [pokemon],
  );
  const num = useMemo(
    () => `#${padStart(String(asStateData(pokemon)?.id || "0"), 4, "0")}`,
    [pokemon],
  );
  const subHeading = useMemo(() => `${num} ${variety}`, [variety, num]);

  const { component, primary, secondary } = useFashionTheme();

  const renderContent = ([, pokemon]: [IZSpecies, IZPokemon]) => {
    const { artwork } = pokemon;

    return (
      <ZBox fashion={component}>
        <ZImage
          src={artwork}
          width={ZSizeVaried.Full}
          height={ZSizeVaried.Full}
          fit="scale-down"
          name="artwork"
        />
      </ZBox>
    );
  };

  const renderFooter = () => {
    const varieties = asStateData(species)?.varieties;
    const max = (varieties?.length || 0) - 1;
    const min = 0;

    return (
      <ZStack orientation={ZOrientation.Horizontal} gap={ZSizeFixed.Small}>
        <ZButton
          label={
            <ZIconFontAwesome name="arrow-left" width={ZSizeFixed.ExtraSmall} />
          }
          tooltip="Previous"
          width={ZSizeVaried.Full}
          disabled={index <= min}
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          fashion={secondary}
          name="previous"
        />
        <ZButton
          label={
            <ZIconFontAwesome
              name="arrow-right"
              width={ZSizeFixed.ExtraSmall}
            />
          }
          tooltip="Next"
          width={ZSizeVaried.Full}
          disabled={index >= max}
          onClick={() =>
            setIndex((i) => Math.min(i + 1, varieties!.length - 1))
          }
          fashion={primary}
          name="next"
        />
      </ZStack>
    );
  };

  return (
    <div
      className="ZSpeciesVarietiesCard-root"
      data-name={speciesName}
      data-variety={asStateData(pokemon)?.name}
    >
      <ZResourceCard
        CardProps={{
          TitleProps: {
            avatar: <ZImage src={sprite} width={ZSizeFixed.Medium} />,
            heading,
            subHeading,
          },
          footer: renderFooter(),
        }}
        resource={[species, pokemon, main]}
        name={speciesName}
      >
        {renderContent}
      </ZResourceCard>
    </div>
  );
}
