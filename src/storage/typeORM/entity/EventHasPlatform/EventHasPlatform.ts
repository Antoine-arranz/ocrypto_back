import {
  Entity,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Platform } from "../Platform";
import { Event } from "../Event";

@Entity("EventHasPlatforms")
export default class EventHasPlatform extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Platform, (Platform) => Platform.Events, {
    primary: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "Platform_Id" })
  Platform: Platform;

  @ManyToOne(() => Event, (Event) => Event.Platforms, {
    primary: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "Event_Id" })
  Event: Event;
}
