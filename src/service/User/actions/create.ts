import bcrypt from "bcrypt";
import { UserCreateI } from "../../../interfaces/object";
import config from "../../../config";
import { User } from "../../../storage/typeORM/entity/User";
import { createUser as createNewUser } from "../../../storage/typeORM/entity/User/Repositories";
const createUser = async (data: UserCreateI): Promise<User> => {
  data.password = await bcrypt.hash(data.password, config.app.hash);

  const newUser = await createNewUser(data);

  return newUser;
};

export default createUser;
