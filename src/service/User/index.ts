import {
  AuthenticationFailedError,
  AccountNotValidatedError,
} from "../../interfaces/error/CustomsErrors";
import { UserCreateI, UserLoginI } from "../../interfaces/object";
import * as userActions from "./actions";
import bcrypt from "bcrypt";
import { User } from "../../storage/typeORM/entity/User";

class UserService {
  public async create(data: UserCreateI): Promise<User> {
    const user = await userActions.createUser(data);
    return user;
  }

  public async login(data: UserLoginI): Promise<User> {
    const user = await userActions.findOneUser(data.email);
    if (!user) {
      throw new AuthenticationFailedError();
    }

    const passwordMatch = await bcrypt.compare(data.password, user?.password);
    if (passwordMatch) {
      if (!user?.verified) throw new AccountNotValidatedError();
    }

    return user;
  }
}

export default UserService;
