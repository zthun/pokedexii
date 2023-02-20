import { IZCircusDriver, ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/cirque';

/**
 * The component model for the search text.
 */
export class ZPokedexSearchComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPokedexSearch-root';

  /**
   * Gets the underlying input.
   *
   * @returns
   *        The underlying input element.
   */
  private _input(): Promise<IZCircusDriver> {
    return this.driver.select('input');
  }

  /**
   * Enters the search text and commits it with the enter key.
   *
   * @param value -
   *        The search text to input.
   */
  public async enter(value: string) {
    const input = await this._input();
    const act = new ZCircusActBuilder().click().type(value).press(ZCircusKeyboardQwerty.enter).build();
    await input.perform(act);
  }

  /**
   * Enters the search text and commits it with the tab key.
   *
   * @param value -
   *        The search text to input.
   */
  public async type(value: string) {
    const input = await this._input();
    const act = new ZCircusActBuilder().click().type(value).press(ZCircusKeyboardQwerty.tab).build();
    await input.perform(act);
  }
}
