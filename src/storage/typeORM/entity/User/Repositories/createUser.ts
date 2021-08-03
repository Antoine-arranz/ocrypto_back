import { User } from "../index";
import { UserCreateI } from "../../../../../interfaces/object";

const createUser = async (data: UserCreateI): Promise<User> => {
  const user = await User.create(data).save();

  return user;
};

export default createUser;
