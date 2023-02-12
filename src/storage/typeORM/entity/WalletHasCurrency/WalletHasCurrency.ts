import { Column, Entity, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { Wallet } from "../Wallet";
import { Currency } from "../Currency";

@Entity("WalletHasCurrencies")
export default class WalletHasCurrency extends BaseEntity {
  @Column({ primary: true })
  Wallet_Id: number;

  @Column({ primary: true })
  Currency_Id: string;

  @Column("float")
  currencyTotal: number;

  @Column("float")
  usdAmount: number;

  @ManyToOne(() => Wallet, (Wallet) => Wallet.WalletHasCurrencies, {
    primary: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "Wallet_Id" })
  Wallet: Wallet;

  @ManyToOne(() => Currency, (Currency) => Currency.WalletHasCurrencies, {
    primary: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "Currency_Id" })
  Currency: Currency;
}
