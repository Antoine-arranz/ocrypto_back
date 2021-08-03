import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Event } from "../Event";

@Entity("Currencies")
export default class Currency extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("float")
  amount: Date;

  @OneToMany(() => Event, (Event) => Event.Currencies)
  Events: Event[];
}
