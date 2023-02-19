import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZPokedexListPage } from './pokedex-list-page';
import { ZPokedexListPageComponentModel } from './pokedex-list-page.cm';

describe('ZPokedexListPage', () => {
  async function createTestTarget() {
    const element = <ZPokedexListPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return await ZCircusBy.first(driver, ZPokedexListPageComponentModel);
  }

  it('should render the page', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
