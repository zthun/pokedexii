import { IZCircusDriver, ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/cirque';

export class ZPokedexSearchComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokedexSearch-root';

  private _input(): Promise<IZCircusDriver> {
    return this.driver.select('input');
  }

  public async enter(value: string) {
    const input = await this._input();
    const act = new ZCircusActBuilder().click().type(value).press(ZCircusKeyboardQwerty.enter).build();
    await input.perform(act);
  }

  public async type(value: string) {
    const input = await this._input();
    const act = new ZCircusActBuilder().click().type(value).press(ZCircusKeyboardQwerty.tab).build();
    await input.perform(act);
  }
}
