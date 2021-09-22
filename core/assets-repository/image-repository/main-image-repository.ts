import type { BaseImageRepositories } from "./base-image-repository";

/**
 * singleton reference holder class since BaseImageRepositories is abstract and gets override by platform
 */
export class MainImageRepository {
  private static _main: BaseImageRepositories<any>;
  static set instance(instance: BaseImageRepositories<any>) {
    this._main = instance;
  }

  static get instance(): BaseImageRepositories<any> {
    if (!this._main) {
      throw "cannot get main ImageRepositories. set it via `MainImageRepository.set()` before calling this.";
    }
    return this._main;
  }
}
