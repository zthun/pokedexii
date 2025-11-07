import {
  ZBubble,
  ZIconFontAwesome,
  ZImage,
  ZSuspenseRotate,
  useCss,
  useFashionTailor,
  useNavigate,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import {
  asStateData,
  isStateErrored,
  isStateLoaded,
  isStateLoading,
} from "@zthun/helpful-react";
import type { IZEvolutionNode } from "@zthun/pokedex";
import { ZSpeciesBuilder } from "@zthun/pokedex";
import { startCase } from "lodash-es";
import { useSpecies } from "../species/species-service.mjs";
import { usePokemonTheme } from "../theme/pokemon-theme.mjs";

export interface IZEvolutionNodeBubble {
  node: IZEvolutionNode;
}

export function ZEvolutionNodeBubble(props: IZEvolutionNodeBubble) {
  const tailor = useFashionTailor();
  const { node } = props;
  const navigate = useNavigate();
  const [species] = useSpecies(node.species);
  const { evolution } = usePokemonTheme();

  const handleClick = isStateLoaded(species)
    ? navigate.bind(null, `/pokemon/${species.name}`)
    : undefined;

  const renderAvatar = () => {
    if (isStateLoading(species)) {
      return <ZSuspenseRotate width={ZSizeFixed.Medium} />;
    }

    if (isStateErrored(species)) {
      return <ZIconFontAwesome name="question" width={ZSizeFixed.Medium} />;
    }

    return (
      <ZImage
        width={ZSizeVaried.Full}
        height={ZSizeVaried.Full}
        fit="scale-down"
        src={species.artwork}
      />
    );
  };

  const renderName = () => {
    if (isStateLoading(species)) {
      return "Loading...";
    }

    if (isStateErrored(species)) {
      return startCase(new ZSpeciesBuilder().build().name);
    }

    return startCase(species.name);
  };

  const _className = useCss(css`
    .ZEvolutionNodeBubble-name {
      margin-top: ${tailor.gap(ZSizeFixed.ExtraSmall)};
      text-align: center;
    }
  `);

  return (
    <div
      className={cssJoinDefined("ZEvolutionNodeBubble-root", _className)}
      data-species={asStateData(species)?.name}
    >
      <ZBubble
        className={cssJoinDefined("ZEvolutionNodeBubble-avatar")}
        width={ZSizeFixed.Large}
        padding={ZSizeFixed.ExtraSmall}
        border={ZSizeFixed.ExtraLarge}
        fashion={evolution}
        onClick={handleClick}
      >
        {renderAvatar()}
      </ZBubble>
      <div className={cssJoinDefined("ZEvolutionNodeBubble-name")}>
        {renderName()}
      </div>
    </div>
  );
}
