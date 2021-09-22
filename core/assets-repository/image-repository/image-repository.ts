import { ImageAsset, TemporaryImageAsset } from "./image-asset";
import { IImageRepository } from "@base-sdk/base";
import { build_temp_static_remote_asset_uri_to_be_replaced_later__dangerous } from "./temporary-image-asset-url-reservation";
import assert from "assert";

export class ImageRepository<P extends string = string>
  implements IImageRepository<TemporaryImageAsset> {
  images: Map<string, TemporaryImageAsset> = new Map<
    string,
    TemporaryImageAsset
  >();

  constructor(readonly buildId: string, readonly prefix: P) {
    assert(prefix?.length > 0, "prefix must be a non-empty string");
  }

  exists(key: string): boolean {
    return this.images.has(key);
  }

  addImage<P extends string = string>(props: {
    key: string;
    hash?: string;
    data?: Uint8Array;
  }): TemporaryImageAsset<P> {
    if (this.exists(props.key)) {
      console.warn(
        "image you are tring to register to current build repository is already registered.",
        props.hash
      );
      return this.images[props.key];
    } else {
      // register image to repository images
      const newImage = new TemporaryImageAsset<P>(
        props.key,
        props.hash,
        (this.prefix as string) as P
      );
      this.images[props.key] = newImage;
      // console.info(
      //   `registered image of key ${props.key} to image repository`,
      //   this.images
      // );
      return newImage;
    }
  }

  async makeTransportable(): Promise<TransportableImageRepository> {
    const imageAssets: Array<ImageAsset> = [];
    const jobs: Array<Promise<Uint8Array>> = [];
    const keys = Object.keys(this.images);
    for (const key of keys) {
      const asset: TemporaryImageAsset = this.images[key];
      const job = asset.fetchData();
      jobs.push(job);
    }

    const rawImageDatas = await Promise.all(jobs);
    rawImageDatas.forEach((v, i, a) => {
      const key = keys[i];
      imageAssets.push({
        key: key,
        data: v,
        url: build_temp_static_remote_asset_uri_to_be_replaced_later__dangerous(
          this.prefix,
          key
        ),
      });
    });

    return {
      buildId: this.buildId,
      images: imageAssets,
    };
  }
}

// interface for sending this as ui.postmessage
export interface TransportableImageRepository {
  buildId: string;
  images: ReadonlyArray<ImageAsset>;
}
