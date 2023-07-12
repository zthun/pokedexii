import { IZCard, IZComponentName, IZComponentStyle, ZAlert, ZCard, ZIconFontAwesome } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { ZAsyncDataState, isStateErrored, isStateLoading } from '@zthun/helpful-react';
import { castArray, find } from 'lodash';
import React, { ReactNode } from 'react';
import { usePokemonTheme } from '../theme/pokemon-theme';

export interface IZResourceCard<T> extends IZComponentName, IZComponentStyle {
  CardProps?: Omit<IZCard, 'children' | 'loading' | 'name' | 'className'>;

  resource: ZAsyncDataState<T> | ZAsyncDataState<T>[];
  children: (resource: T[]) => ReactNode | ReactNode[];
}

export function ZResourceCard<T>(props: IZResourceCard<T>) {
  const { CardProps, children, className, name, resource } = props;
  const { error } = usePokemonTheme();
  const resource$ = castArray(resource);
  const _loading = resource$.some((r) => isStateLoading(r));

  const renderContent = () => {
    if (_loading) {
      return null;
    }

    const resource$$ = resource$ as (Error | T)[];

    const _error = find(resource$$, (r) => isStateErrored(r)) as Error | undefined;

    if (_error) {
      return (
        <ZAlert
          message={_error.message}
          heading='Error'
          fashion={error}
          avatar={<ZIconFontAwesome name='circle-exclamation' width={ZSizeFixed.Medium} />}
          name='resource-load-error'
        />
      );
    }

    const resource$$$ = resource$$ as T[];
    return children(resource$$$);
  };

  return (
    <ZCard {...CardProps} className={cssJoinDefined('ZResourceCard-root', className)} loading={_loading} name={name}>
      {renderContent()}
    </ZCard>
  );
}
