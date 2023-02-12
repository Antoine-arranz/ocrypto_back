import { createQueryBuilder } from "typeorm";
import { Platform } from "../index";

const getAllPlatforms = async (): Promise<Array<Platform>> => {
  const platforms = await Platform.find();

  return platforms;
};

export default getAllPlatforms;
