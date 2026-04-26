import type {
  IZComponentAdornment,
  IZComponentStyle,
} from "@zthun/fashion-boutique";
import {
  useCss,
  useFashionTailor,
  ZCaption,
  ZFlex,
  ZImage,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { css, cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import type { ZType } from "@zthun/pokedex";
import { ZTypeBuilder } from "@zthun/pokedex";
import { startCase } from "lodash-es";
import { useMemo } from "react";

import { usePokemonTheme } from "../theme/pokemon-theme.mjs";

export interface IZTypeBadge extends IZComponentStyle, IZComponentAdornment {
  compact?: boolean;
  type: ZType;
}

export function ZTypeBadge(props: IZTypeBadge) {
  const { types } = usePokemonTheme();
  const tailor = useFashionTailor();
  const { type, className, compact, suffix } = props;
  const artwork = useMemo(
    () => new ZTypeBuilder().name(type).build().artwork,
    [type],
  );
  const _type = useMemo(() => new ZColorPicker(types[type]), [type, types]);

  const renderBody = () => {
    const icon = (
      <ZImage
        className="ZTypeBadge-icon"
        src={artwork}
        name={type}
        width={ZSizeFixed.ExtraSmall}
        height={ZSizeFixed.ExtraSmall}
      />
    );

    const body = compact ? null : (
      <ZCaption className="ZTypeBadge-name" compact>
        {startCase(type)}
      </ZCaption>
    );

    return (
      <ZStack
        align={{ items: "center" }}
        gap={ZSizeFixed.Small}
        orientation={ZOrientation.Horizontal}
      >
        {icon}
        {body}
      </ZStack>
    );
  };

  const _className = useCss(css`
    & {
      background: ${_type.idle.foreground};
      border-color: ${_type.idle.border};
      border-radius: ${tailor.rounding(ZSizeFixed.Small)};
      border-style: solid;
      border-width: ${tailor.thickness(ZSizeFixed.Medium)};
      color: ${_type.idle.contrast};
      padding: ${tailor.gap(ZSizeFixed.ExtraSmall)};
      text-transform: uppercase;
    }
  `);

  return (
    <div
      className={cssJoinDefined("ZTypeBadge-root", _className, className)}
      data-name={type}
    >
      <ZStack orientation={ZOrientation.Horizontal}>
        <ZFlex className="ZTypeBadge-body" grow={1}>
          {renderBody()}
        </ZFlex>
        <ZFlex className="ZTypeBadge-suffix" grow={0}>
          {suffix}
        </ZFlex>
      </ZStack>
    </div>
  );
}
