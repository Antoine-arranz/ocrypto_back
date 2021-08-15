import { EventI } from "../../../../../interfaces/object";
import { Event } from "../";
import { createQueryBuilder } from "typeorm";
import { Currency } from "../../Currency";

const getAllEvents = async (walletId: number): Promise<Array<any>> => {
  const events = await Event.find({
    where: { Wallet_Id: walletId },
    relations: ["Platform", "Currency"],
  });

  //const events = await Event.find({ where: { Wallet_Id: walletId } });

  return events;
};

export default getAllEvents;
