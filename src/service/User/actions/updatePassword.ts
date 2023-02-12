import bcrypt from "bcrypt";
import { User } from "../../../storage/typeORM/entity/User";

import config from "../../../config";

const updatePasswordUser = async (user: User, password: string) => {
  const passwordHash = await bcrypt.hash(password, config.app.hash);

  user.password = passwordHash;
  user.save();
};

export default updatePasswordUser;
