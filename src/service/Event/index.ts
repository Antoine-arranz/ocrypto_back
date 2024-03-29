import { EventI } from "../../interfaces/object";
import * as eventActions from "./actions";
import { Event } from "../../storage/typeORM/entity/Event";
class EventService {
  public async insert(
    walletId: number,
    platformId: number,
    eventType: string,
    eventDate: Date,
    quantity: number,
    amount: number,
    CurrencyAsset: string,
    CurrencyCounterparty: string,
    fees?: number
  ): Promise<void> {
    await eventActions.insert(
      walletId,
      platformId,
      eventType,
      eventDate,
      quantity,
      amount,
      CurrencyAsset,
      CurrencyCounterparty,
      fees
    );
  }

  public async getEvents(walletId: number): Promise<Array<Event>> {
    const events = await eventActions.getAllShowed(walletId);

    return events;
  }

  public async getQuantityTotal(walletId: number): Promise<Array<any>> {
    const events = await eventActions.getPositiveQuantity(walletId);

    return events;
  }
}

export default EventService;
