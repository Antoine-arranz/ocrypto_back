import bcrypt from "bcrypt";
import { UserCreateI } from "../../../interfaces/object";
import config from "../../../config";

import { createUser as createNewUser } from "../../../storage/model/entity/User/Repositories";
const createUser = async (data: UserCreateI) => {
  data.password = await bcrypt.hash(data.password, config.app.hash);

  const newUser = await createNewUser(data);

  return newUser;
};

export default createUser;
