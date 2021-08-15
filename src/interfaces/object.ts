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
