import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZPokedexDetailsPage } from './pokedex-details-page';
import { ZPokedexDetailsPageComponentModel } from './pokedex-details-page.cm';

describe('ZPokedexDetailsPage', () => {
  async function createTestTarget() {
    const element = <ZPokedexDetailsPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return await ZCircusBy.first(driver, ZPokedexDetailsPageComponentModel);
  }

  it('should render the page', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
