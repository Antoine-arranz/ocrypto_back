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

@Entity("Platforms")
export default class Platform extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;
  @OneToMany(() => Event, (Event) => Event.Platforms)
  Events: Event[];
}
