import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Event } from "../Event";

@Entity("Currencies")
export default class Currency extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  symbol: string;

  @OneToMany(() => Event, event => event.CurrencyAsset)
  Events: Event[];
 
  @OneToMany(() => Event, event => event.CurrencyCounterparty)
  EventsA: Event[];
}
