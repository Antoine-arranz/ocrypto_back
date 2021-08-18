import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
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
  quantity: number;

  @Column("float", { nullable: true })
  amount: number;

  @Column("float", { nullable: true })
  usd_amount: number;

  @Column("float", { nullable: true })
  fees: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({default : true})
  show : boolean

  @Column()
  lastState:number;

  @Column()
  CurrencyAsset_Id: string;

  @Column()
  CurrencyCounterparty_Id: string;

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

  @ManyToOne(() => Currency, (CurrencyAsset_Id) => CurrencyAsset_Id.Events)
  @JoinColumn({ name: "CurrencyAsset_Id" })
  CurrencyAsset: Currency;

  @ManyToOne(
    () => Currency,
    (CurrencyCounterparty_Id) => CurrencyCounterparty_Id.Events
  )
  @JoinColumn({ name: "CurrencyCounterparty_Id" })
  CurrencyCounterparty: Currency;
}
