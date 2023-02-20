import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { ZCircusKeyboardQwerty } from '@zthun/cirque';
import React, { FocusEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { makeStyles } from '../theme/make-styles';
import { cssClass } from '../util/css-class';

export interface IZPokedexSearch {
  value: string | undefined;
  onCommit: (value: string) => void;
}

const usePokedexSearchStyles = makeStyles()((theme) => ({
  search: {
    background: theme.palette.common.white
  }
}));

export function ZPokedexSearch(props: IZPokedexSearch) {
  const { value, onCommit } = props;
  const [current, setCurrent] = useState(value || '');
  const { classes } = usePokedexSearchStyles();

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onCommit(value);
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setCurrent(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { code } = e;

    if (code !== ZCircusKeyboardQwerty.enter.code) {
      return;
    }

    const { value } = e.target as HTMLInputElement;
    onCommit(value);
  };

  return (
    <TextField
      className={cssClass('ZPokedexSearch-root', classes.search)}
      label='Search'
      type='text'
      value={current}
      onInput={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      InputProps={{ endAdornment: <Search fontSize='small' /> }}
    />
  );
}
