import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZAsyncDataState, ZAsyncLoading } from '@zthun/helpful-react';
import { identity } from 'lodash';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZResourceCard } from './resource-card';
import { ZResourceCardComponentModel } from './resource-card.cm';

describe('ZResourceCard', () => {
  let resourceA: ZAsyncDataState<string>;
  let resourceB: ZAsyncDataState<string>;

  const createTestTarget = async () => {
    const element = <ZResourceCard resource={[resourceA, resourceB]}>{identity}</ZResourceCard>;

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZResourceCardComponentModel);
  };

  beforeEach(() => {
    resourceA = 'ok-a';
    resourceB = 'ok-b';
  });

  it('should render a card as loading if any resource is the loading symbol', async () => {
    // Arrange.
    resourceB = ZAsyncLoading;
    const target = await createTestTarget();
    // Act.
    const actual = await target.loading();
    // Assert.
    expect(actual).toBeTruthy();
  });

  it('should render an error if any resource has errored', async () => {
    // Arrange.
    const expected = new Error('GAME OVER');
    resourceA = expected;
    const target = await createTestTarget();
    // Act.
    const error = await target.error();
    const message = await error?.message();
    const actual = await message?.text();
    // Assert.
    expect(actual).toEqual(expected.message);
  });
});
