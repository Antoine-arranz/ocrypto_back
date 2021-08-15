import { EventI } from "../../interfaces/object";
import * as eventActions from "./actions";
import { Event } from "../../storage/typeORM/entity/Event";
class EventService {
  public async insert(
    walletId: number,
    platformId: number,
    eventType: string,
    eventDate: Date,
    quantityBougth: number,
    amountSell: number,
    amountBought: number,
    currencyBougth_Id: number,
    currencySell_Id: number,
    quantitySell?: number,
    fees?: number
  ): Promise<void> {
    await eventActions.insert(
      walletId,
      platformId,
      eventType,
      eventDate,
      quantityBougth,
      amountSell,
      amountBought,
      currencyBougth_Id,
      currencySell_Id,
      quantitySell,
      fees
    );
  }

  public async getEvents(walletId: number): Promise<Array<Event>> {
    const events = await eventActions.getAll(walletId);

    return events;
  }

  public async getQuantityTotal(walletId: number): Promise<Array<any>> {
    const events = await eventActions.getQuantity(walletId);

    return events;
  }
}

export default EventService;
