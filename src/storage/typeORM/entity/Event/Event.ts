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
  quantityBougth: number;

  @Column("float", { nullable: true })
  quantitySell: number;
  @Column("float", { nullable: true })
  amountBought: number;
  @Column("float", { nullable: true })
  amountSell: number;

  @Column("float", { nullable: true })
  fees: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  CurrencyBought_Id: number;

  @Column()
  CurrencySell_Id: number;

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

  @ManyToOne(() => Currency, (Currency) => Currency.Events, {
    primary: true,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "CurrencyBought_Id" }])
  Currency: Currency;

  //@ManyToOne(() => Currency, (Currency) => Currency.CurrencySell)
  //@JoinColumn({ name: "CurrencySell_Id" })
  //CurrencySell: Currency;
}
