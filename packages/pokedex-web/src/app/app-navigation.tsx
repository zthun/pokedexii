import {
  useNavigate,
  ZButton,
  ZContentTitle,
  ZDrawer,
  ZH4,
  ZIconFontAwesome,
  ZList,
  ZListItem,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { startCase } from "lodash-es";
import { useState } from "react";

export function ZPokedexNavigation() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const openSettings = setOpen.bind(null, true);
  const closeSettings = setOpen.bind(null, false);

  const renderNavigation = (name: string, avatar: string) => {
    return (
      <ZListItem
        key={name}
        name={name}
        interactive
        onClick={navigate.bind(null, `/${name}`)}
      >
        <ZContentTitle
          avatar={<ZIconFontAwesome name={avatar} width={ZSizeFixed.Medium} />}
          heading={<ZH4 compact>{startCase(name)}</ZH4>}
        />
      </ZListItem>
    );
  };

  return (
    <>
      <ZButton
        onClick={openSettings}
        label={<ZIconFontAwesome name="bars" />}
      />
      <ZDrawer open={open} onClose={closeSettings}>
        <ZList>
          {renderNavigation("types", "bolt")}
          {renderNavigation("pokemon", "spaghetti-monster-flying")}
        </ZList>
      </ZDrawer>
    </>
  );
}
