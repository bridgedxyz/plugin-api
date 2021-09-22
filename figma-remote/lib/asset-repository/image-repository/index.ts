import { BaseImageRepositories } from "@design-sdk/core/assets-repository/image-repository";
import { FIGMA_REMOTE_LIB_AUTH_CREDENTIAL_GLOBAL } from "../../configure-auth-credentials/__internal__";
import { fetchImagesOfFile, fetchNodeAsImage } from "../../fetch";
type RemoteImage = string;

export class RemoteImageRepositories extends BaseImageRepositories<RemoteImage> {
  private __node_export_image_map: { [key: string]: RemoteImage } = {};
  private __file_image_map: { [key: string]: RemoteImage } = {};
  private get credentials() {
    return FIGMA_REMOTE_LIB_AUTH_CREDENTIAL_GLOBAL;
  }
  constructor(private readonly fileId: string) {
    super();
  }

  async fetchDataById(id: string): Promise<RemoteImage> {
    if (this.__node_export_image_map[id]) {
      return this.__node_export_image_map[id];
    }

    const res = await fetchNodeAsImage(this.fileId, this.credentials, id);
    // update maps with newly retrieved data.
    this.__node_export_image_map = {
      ...this.__node_export_image_map,
      ...res,
    };
    return res[id];
  }

  async _fetchDataByHash(hash: string): Promise<RemoteImage> {
    if (this.__file_image_map[hash]) {
      return this.__file_image_map[hash];
    }

    this.__file_image_map = await fetchImagesOfFile(
      this.fileId,
      this.credentials
    );
    return this.__file_image_map[hash];
  }
}
