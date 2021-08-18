import { EventI } from "../../../../../interfaces/object";
import { Event } from "..";
import { createQueryBuilder } from "typeorm";

const insertPlatforms = async (eventAdded: any): Promise<any> => {
  const event = await createQueryBuilder(Event)
    .insert()
    .values(eventAdded)
    .execute();

  return event;
};

export default insertPlatforms;
