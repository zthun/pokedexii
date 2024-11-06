import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export function defineWeb(dir: string) {
  return defineConfig({
    plugins: [tsConfigPaths()],
    server: {
      strictPort: true,
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        lodash: 'lodash-es'
      }
    }
  });
}
