import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Event } from "../Event";

@Entity("Currencies")
export default class Currency extends BaseEntity {
  @PrimaryColumn()
  apiId: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  symbol: string;

  @OneToMany(() => Event, (event) => event.CurrencyAsset)
  Events: Event[];

  @OneToMany(() => Event, (event) => event.CurrencyCounterparty)
  EventsA: Event[];
}
