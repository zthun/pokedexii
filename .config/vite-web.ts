import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import tsConfigPaths from "vite-tsconfig-paths";

export function defineWeb() {
  return defineConfig({
    plugins: [tsConfigPaths(), checker({ typescript: true })],
    server: {
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: ["pokedexii.local.zthunworks.com"],
    },
    resolve: { alias: { lodash: "lodash-es" } },
  });
}
