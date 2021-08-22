export interface UserCreateI {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
}

export interface UserLoginI {
  email: string;
  password: string;
}

export interface TokenI {
  _id: string;
  token: string;
  createdAt: Date;
  expiration: number;
}

export interface WalletI {
  name: string;
}

export interface EventI {
  type: "buy" | "sell";
  date: Date;
  quantity: number;
  unit_price: number;
  fees: number;
}

export interface UserUpdateI {
  email: string;
  lastName: string;
  firstName: string;
  country: string;
}

export interface newEvent {
  Wallet_Id: number;
  Platform_Id: number;
  type: string;
  date: Date;
  quantity: number;
  amount: number;
  CurrencyAsset_Id: string;
  CurrencyCounterparty_Id: string;
  fees?: number;
  lastState: number;
  currencyAssetNewState: number;
  lastUsdAmount: number;
  usdAmount: number;
  show?: boolean;
}
