import { MainImageRepository } from "./main-image-repository";
import { build_temp_static_remote_asset_uri_to_be_replaced_later__dangerous } from "./temporary-image-asset-url-reservation";

export abstract class TemporaryAsset<T> {
  data?: T;
  url: string;
  constructor(
    readonly key: string,
    args?: {
      url?: string;
      data?: T;
    }
  ) {
    this.url = args?.url;
    this.data = args?.data;
  }

  abstract fetchData(): T | Promise<T>;
}

export interface ImageAsset {
  data: Uint8Array;
  key: string;
  url: string;
}

export class TemporaryImageAsset<
  P extends string = string
> extends TemporaryAsset<Uint8Array> {
  data?: Uint8Array;
  url: P;
  constructor(
    readonly key: string,
    readonly hash: string,
    readonly prefix: P,
    args?: {
      data?: Uint8Array;
    }
  ) {
    super(key, args);
    this.url = this.makeUrl(key);
  }

  makeUrl(key: string): P {
    return build_temp_static_remote_asset_uri_to_be_replaced_later__dangerous<P>(
      this.prefix,
      key
    );
  }

  async fetchData(): Promise<Uint8Array> {
    if (this.data) {
      // if data exists, return it.
      return this.data;
    }
    // return await ImageRepositories.fetchDataByHash(this.hash)
    return await MainImageRepository.instance.fetchDataById(this.key);
  }
}
