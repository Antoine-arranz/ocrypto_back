import bcrypt from "bcrypt";
import { UserCreateI } from "../../../interfaces/object";
import config from "../../../config";
import { User } from "../../../storage/typeORM/entity/User";
import {
  createUser as createNewUser,
  findOneUser,
} from "../../../storage/typeORM/entity/User/Repositories";
import { UserAlreadyExist } from "../../../interfaces/error/CustomsErrors";
const createUser = async (data: UserCreateI): Promise<User> => {
  data.password = await bcrypt.hash(data.password, config.app.hash);

  const isEmailUsed = await findOneUser(data.email);

  if (isEmailUsed) {
    throw new UserAlreadyExist();
  }

  const newUser = await createNewUser(data);

  return newUser;
};

export default createUser;
