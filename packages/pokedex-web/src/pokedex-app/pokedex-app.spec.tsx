import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZPokedexApp } from './pokedex-app';
import { ZPokedexAppComponentModel } from './pokedex-app.cm';

describe('ZPokedexApp', () => {
  async function createTestTarget() {
    const element = <ZPokedexApp />;

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZPokedexAppComponentModel);
  }

  it('should render the application', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
