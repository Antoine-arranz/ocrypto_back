import * as platformActions from "./actions";

class PlatformService {
  public async insert() {
    await platformActions.insertPlatforms();
  }

  public async getAllPlatforms() {
    const platforms = platformActions.getAllPlatforms();

    return platforms;
  }
}

export default PlatformService;
