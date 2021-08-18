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
} from "typeorm";
import { User } from "../User";
import { Event } from "../Event";
import { WalletHasCurrency } from "../WalletHasCurrency";

@Entity("Wallets")
export default class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  User_Id: number;
  
  @ManyToOne(() => User, (User) => User.Wallets)
  @JoinColumn({ name: "User_Id" })
  User: User;

  @OneToMany(() => Event, (Event) => Event.Wallet, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  Event: Event[];

  @OneToMany(() => WalletHasCurrency, (WalletHasCurrency) => WalletHasCurrency.Wallet)
  WalletHasCurrencies: WalletHasCurrency[];
}
