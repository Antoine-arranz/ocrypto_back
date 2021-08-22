import { EventI } from "../../../../../interfaces/object";
import { Event } from "..";
import { createQueryBuilder } from "typeorm";

const insertEvent = async (eventAdded: any): Promise<any> => {
  const event = await createQueryBuilder(Event)
    .insert()
    .values(eventAdded)
    .execute();

  return event;
};

export default insertEvent;
