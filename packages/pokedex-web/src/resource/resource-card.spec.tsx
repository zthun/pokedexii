import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZAsyncDataState, ZAsyncLoading } from '@zthun/helpful-react';
import { identity } from 'lodash';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZResourceCard } from './resource-card';
import { ZResourceCardComponentModel } from './resource-card.cm';

describe('ZResourceCard', () => {
  let resource: ZAsyncDataState<string>;

  const createTestTarget = async () => {
    const element = <ZResourceCard resource={resource}>{identity}</ZResourceCard>;

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZResourceCardComponentModel);
  };

  it('should render a card as loading if the resource is the loading symbol', async () => {
    // Arrange.
    resource = ZAsyncLoading;
    const target = await createTestTarget();
    // Act.
    const actual = await target.loading();
    // Assert.
    expect(actual).toBeTruthy();
  });

  it('should render an error if the resource cannot be loaded', async () => {
    // Arrange.
    const expected = new Error('GAME OVER');
    resource = expected;
    const target = await createTestTarget();
    // Act.
    const error = await target.error();
    const message = await error?.message();
    const actual = await message?.text();
    // Assert.
    expect(actual).toEqual(expected.message);
  });
});
