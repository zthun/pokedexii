import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { ZCircusKeyboardQwerty } from '@zthun/cirque';
import React, { FocusEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { makeStyles } from '../theme/make-styles';
import { cssClass } from '../util/css-class';

/**
 * The properties for the pokedex search component.
 */
export interface IZPokedexSearch {
  /**
   * The current value.
   */
  value: string | undefined;

  /**
   * The handler for when the value is committed.
   *
   * @param value -
   *        The value that was committed.
   */
  onCommit: (value: string) => void;
}

const usePokedexSearchStyles = makeStyles()((theme) => ({
  search: {
    background: theme.palette.common.white
  }
}));

/**
 * Represents a text search component that commits on blur and the enter key.
 */
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
