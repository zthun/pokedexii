import { IZCard, IZComponentName, IZComponentStyle, ZAlert, ZCard, ZIconFontAwesome } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { ZAsyncDataState, isStateErrored, isStateLoaded, isStateLoading } from '@zthun/helpful-react';
import React, { ReactNode } from 'react';
import { usePokemonTheme } from '../theme/pokemon-theme';

export interface IZResourceCard<T> extends IZComponentName, IZComponentStyle {
  CardProps?: Omit<IZCard, 'children' | 'loading' | 'name' | 'className'>;

  resource: ZAsyncDataState<T>;
  children: (resource: T) => ReactNode | ReactNode[];
}

export function ZResourceCard<T>(props: IZResourceCard<T>) {
  const { CardProps, children, className, name, resource } = props;
  const { error } = usePokemonTheme();

  const renderContent = () => {
    if (isStateErrored(resource)) {
      return (
        <ZAlert
          message={resource.message}
          heading='Error'
          fashion={error}
          avatar={<ZIconFontAwesome name='circle-exclamation' width={ZSizeFixed.Medium} />}
          name='resource-load-error'
        />
      );
    }

    if (isStateLoaded(resource)) {
      return children(resource);
    }

    return null;
  };

  return (
    <ZCard
      {...CardProps}
      className={cssJoinDefined('ZResourceCard-root', className)}
      loading={isStateLoading(resource)}
      name={name}
    >
      {renderContent()}
    </ZCard>
  );
}
