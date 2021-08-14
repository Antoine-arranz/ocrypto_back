import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
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
  @OneToMany(() => Event, (Event) => Event.Platform, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  Event: Event[];
}
