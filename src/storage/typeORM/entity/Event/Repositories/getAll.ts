import { EventI } from "../../../../../interfaces/object";
import { Event } from "../";

const getAllEvents = async (walletId: number): Promise<Array<Event>> => {
  const events = await Event.find({ where: { walletId: walletId } });

  return events;
};

export default getAllEvents;
