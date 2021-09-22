import { ImageRepository } from "./image-repository";

export abstract class BaseImageRepositories<T = Uint8Array> {
  repositories: Map<string, ImageRepository> = new Map<
    string,
    ImageRepository
  >();
  imageHashMap: Map<string, T> = new Map<string, T>();

  get(buildId: string): ImageRepository {
    const _exists = this.repositories[buildId];
    if (_exists) {
      return _exists;
    }
    throw new Error(`Image repository with buildId ${buildId} not found`);
  }

  clear() {
    this.repositories = new Map<string, ImageRepository>();
    this.imageHashMap = new Map<string, T>();
  }

  /**
   * registers new image repository
   * @param repository
   */
  register(repository: ImageRepository) {
    this.repositories[repository.buildId] = repository;
  }

  /**
   * removes image repository registration from image repositories by buildid
   * @param buildId
   */
  delete(buildId: string) {
    this.repositories.delete(buildId);
  }

  registerDataWithHash(hash: string, data: T) {
    this.imageHashMap[hash] = data;
  }

  async fetchDataByHash(hash: string): Promise<T> {
    if (this.isImageHashRegistered(hash)) {
      return this.imageHashMap[hash];
    }
    const imageData = await this._fetchDataByHash(hash);
    this.registerDataWithHash(hash, imageData);
    return imageData;
  }

  /**
   * platform specific data fetching
   * @param hash
   */
  abstract _fetchDataByHash(hash: string): T | Promise<T>;

  /**
   * platform specific methods
   * @param id image node's id
   */
  abstract fetchDataById(id: string): T | Promise<T>;

  isImageHashRegistered(hash: string): boolean {
    return this.imageHashMap.has(hash);
  }
}
