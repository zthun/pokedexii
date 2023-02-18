import { After, Given, setDefaultTimeout, Then, World } from '@cucumber/cucumber';
import { IZCircusDriver, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupChrome } from '@zthun/cirque-du-selenium';
import assert from 'assert';
import { ZPokedexAppComponentModel } from '../src/pokedex-app/pokedex-app.cm';

setDefaultTimeout(30000);

interface IZPokedexApp {
  driver: IZCircusDriver;
  app: ZPokedexAppComponentModel;
}

Given('I navigate to the Pokedex web application', async function (this: World<IZPokedexApp>) {
  const url = 'http://localhost:5173/';
  this.parameters.driver = await new ZCircusSetupChrome(url).setup();
  this.parameters.app = await ZCircusBy.first(this.parameters.driver, ZPokedexAppComponentModel);
});

Then('the Pokedex web application loads', async function (this: World<IZPokedexApp>) {
  assert.ok(this.parameters.app);
});

After(async function (this: World<IZPokedexApp>) {
  await this.parameters.driver.destroy();
});
