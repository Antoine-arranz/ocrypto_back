import { Platform } from "src/storage/typeORM/entity/Platform";
import { getAllPlatforms } from "../../../storage/typeORM/entity/Platform/Repositories";

const getAll = async (): Promise<Array<Platform>> => {
  const platforms = await getAllPlatforms();

  return platforms;
};

export default getAll;
