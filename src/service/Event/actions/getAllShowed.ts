import { getAllShowed } from "../../../storage/typeORM/entity/Event/Repositories";
import { Event } from "../../../storage/typeORM/entity/Event";
const getAllShowedEvent = async (walletId: number): Promise<Array<Event>> => {
  const events = await getAllShowed(walletId);
  return events;
};

export default getAllShowedEvent;
