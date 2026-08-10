import {
  ZBannerMain,
  ZFashionThemeContext,
  ZNavigate,
  ZNotFound,
  ZRoute,
  ZRouteMap,
} from "@zthun/fashion-boutique";
import theme from "@zthun/fashion-theme-dark";

import { ZSpeciesDetailsPage } from "../species/species-details-page.js";
import { ZSpeciesListPage } from "../species/species-list-page.js";
import { ZTypeListPage } from "../type/type-list-page.js";
import { ZPokedexAvatar } from "./app-avatar.js";
import { ZPokedexNavigation } from "./app-navigation.js";
import { ZPokedexTitle } from "./app-title.js";

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the pokedex web application.
 */
export function ZPokedexApp() {
  return (
    <ZFashionThemeContext value={theme}>
      <ZBannerMain
        TitleProps={{
          avatar: <ZPokedexAvatar />,
          prefix: <ZPokedexTitle />,
          suffix: <ZPokedexNavigation />,
        }}
      >
        <ZRouteMap>
          <ZRoute path="/pokemon/:name" element={<ZSpeciesDetailsPage />} />
          <ZRoute path="/pokemon" element={<ZSpeciesListPage />} />
          <ZRoute path="/types" element={<ZTypeListPage />} />
          <ZRoute path="" element={<ZNavigate to="/pokemon" />} />
          <ZRoute path="*" element={<ZNotFound />} />
        </ZRouteMap>
      </ZBannerMain>
    </ZFashionThemeContext>
  );
}
