import { createQueryBuilder } from "typeorm";
import { Currency } from "../index";

const insertPlatforms = async (
  data: Array<{ name: string; slug: string }>
): Promise<void> => {
  await createQueryBuilder(Currency).insert().values(data).execute();
};

export default insertPlatforms;
