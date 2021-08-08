import {
  AuthenticationFailedError,
  AccountNotValidatedError,
  UserNotExist,
} from "../../interfaces/error/CustomsErrors";
import { UserCreateI, UserLoginI } from "../../interfaces/object";
import * as userActions from "./actions";
import bcrypt from "bcrypt";
import { User } from "../../storage/typeORM/entity/User";
import { generateToken, revokeToken } from "../../config/Token";
import {
  newUserToken,
  resetPasswordToken,
} from "../../config/Token/preBuildToken";

class UserService {
  public async create(data: UserCreateI): Promise<User> {
    const user = await userActions.createUser(data);

    const userToken: string = await generateToken(newUserToken(user.id));

    await userActions.sendValidationEmail(user.email, userToken);
    return user;
  }

  public async login(data: UserLoginI): Promise<User> {
    const user = await userActions.findOneByEmail(data.email);
    if (!user) {
      throw new AuthenticationFailedError();
    }
    console.log(data.password, user?.password);
    const passwordMatch = await bcrypt.compare(data.password, user?.password);
    console.log(passwordMatch);
    if (passwordMatch) {
      if (!user?.verified) throw new AccountNotValidatedError();
    } else {
      throw new AuthenticationFailedError();
    }

    return user;
  }
  public async validate(
    decodeToken: { userId: number; exp: number },
    token: string
  ): Promise<void> {
    const user = await userActions.findOneById(decodeToken.userId);
    user && (await userActions.validate(user));

    revokeToken(token);
  }

  public async resetPassword(email: string) {
    const user = await userActions.findOneByEmail(email);

    if (!user) {
      throw new UserNotExist();
    }

    const token = await generateToken(resetPasswordToken(user.id));

    await userActions.sendResetPassword(user.email, token);
  }

  public async updatePasswordWithToken(
    decryptToken: { userId: number; exp: number },
    password: string,
    token: string
  ) {
    const user = await userActions.findOneById(decryptToken.userId);
    user && (await userActions.updatePassword(user, password));
    revokeToken(token);
  }
}

export default UserService;
