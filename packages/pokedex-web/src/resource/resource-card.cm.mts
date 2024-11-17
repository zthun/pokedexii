import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZAlertComponentModel,
  ZSuspenseComponentModel,
} from "@zthun/fashion-boutique";

export class ZResourceCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZResourceCard-root";

  public error(): Promise<ZAlertComponentModel | null> {
    return ZCircusBy.optional(
      this.driver,
      ZAlertComponentModel,
      "resource-load-error",
    );
  }

  public async loading(): Promise<boolean> {
    const suspense = await ZCircusBy.optional(
      this.driver,
      ZSuspenseComponentModel,
    );

    return suspense != null;
  }

  public async load(): Promise<void> {
    return this.driver.wait(() => this.loading().then((l) => !l));
  }
}
