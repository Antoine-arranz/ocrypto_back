import { createQueryBuilder } from "typeorm";
import { Platform } from "../index";

const insertPlatforms = async (
  data: Array<{ name: string; image: string }>
): Promise<void> => {
  await createQueryBuilder(Platform).insert().values(data).execute();
};

export default insertPlatforms;
