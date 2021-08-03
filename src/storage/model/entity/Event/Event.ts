import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Platform } from "../Platform";
import { Currency } from "../Currency";

@Entity("Events")
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  date: Date;

  @Column()
  quantity: number;

  @Column()
  unit_price: number;

  @Column("float", { nullable: true })
  fees: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Platform, (Platform) => Platform.Events)
  Platforms: Platform[];

  @OneToMany(() => Currency, (Currency) => Currency.Events)
  Currencies: Platform[];
}
