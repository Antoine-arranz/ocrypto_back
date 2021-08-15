import { getAll } from "../../../storage/typeORM/entity/Event/Repositories";
import { Event } from "../../../storage/typeORM/entity/Event";
import { getManager } from "typeorm";
const getAllEvents = async (walletId: number): Promise<Array<Event>> => {
  const events = await getAll(walletId);

  return events;
};

export default getAllEvents;
