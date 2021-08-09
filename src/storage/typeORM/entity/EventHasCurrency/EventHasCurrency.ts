import {
  Entity,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Currency } from "../Currency";
import { Event } from "../Event";

@Entity("EventHasCurrencies")
export default class EventHasCurrency extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Currency, (Currency) => Currency.Events, {
    primary: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "Currency_Id" })
  Currency: Currency;

  @ManyToOne(() => Event, (Event) => Event.Platforms, {
    primary: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "Event_Id" })
  Event: Event;
}
