import type {
  IZCard,
  IZComponentName,
  IZComponentStyle,
} from "@zthun/fashion-boutique";
import {
  useFashionTheme,
  ZAlert,
  ZCard,
  ZIconFontAwesome,
  ZSuspenseProgress,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import type { ZAsyncDataState } from "@zthun/helpful-react";
import { isStateErrored, isStateLoading } from "@zthun/helpful-react";
import { castArray, find } from "lodash-es";
import type { ReactNode } from "react";

export interface IZResourceCard<T> extends IZComponentName, IZComponentStyle {
  CardProps?: Omit<IZCard, "children" | "loading" | "name" | "className">;

  resource: ZAsyncDataState<T> | ZAsyncDataState<T>[];
  children: (resource: T[]) => ReactNode | ReactNode[];
}

export function ZResourceCard<T>(props: IZResourceCard<T>) {
  const { CardProps, children, className, name, resource } = props;
  const { error } = useFashionTheme();
  const resource$ = castArray(resource);
  const _loading = resource$.some((r) => isStateLoading(r));

  const renderContent = () => {
    if (_loading) {
      return <ZSuspenseProgress height={ZSizeFixed.Medium} />;
    }

    const resource$$ = resource$ as (Error | T)[];

    const _error = find(resource$$, (r) => isStateErrored(r));

    if (_error) {
      return (
        <ZAlert
          message={_error.message}
          heading="Error"
          fashion={error}
          avatar={
            <ZIconFontAwesome
              name="circle-exclamation"
              width={ZSizeFixed.Medium}
            />
          }
          name="resource-load-error"
        />
      );
    }

    const resource$$$ = resource$$ as T[];
    return children(resource$$$);
  };

  return (
    <ZCard
      {...CardProps}
      className={cssJoinDefined("ZResourceCard-root", className)}
      name={name}
    >
      {renderContent()}
    </ZCard>
  );
}
