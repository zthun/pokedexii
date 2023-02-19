import { Theme, useTheme as useMuiTheme } from '@mui/material';

import { createMakeStyles } from 'tss-react';

export function usePokedexTheme(): Theme {
  const mui = useMuiTheme();
  return Object.assign({}, mui);
}

export const { makeStyles } = createMakeStyles({ useTheme: usePokedexTheme });
