import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Platform } from "../Platform";
import { Currency } from "../Currency";
import { Wallet } from "../Wallet";

@Entity("Events")
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  date: Date;

  @Column("float")
  quantityBougth: number;

  @Column("float", { nullable: true })
  quantitySell: number;

  @Column("float", { nullable: true })
  fees: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  Platform_Id: number;

  @Column()
  Wallet_Id: number;

  @ManyToOne(() => Platform, (Platform) => Platform.Event)
  @JoinColumn({ name: "Platform_Id" })
  Platform: Platform;

  @ManyToOne(() => Wallet, (Wallet) => Wallet.Event)
  @JoinColumn({ name: "Wallet_Id" })
  Wallet: Wallet;

  @OneToMany(() => Currency, (Currency) => Currency.Events)
  Currencies: Platform[];
}
