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
