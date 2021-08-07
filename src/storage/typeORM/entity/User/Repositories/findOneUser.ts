import { User } from "../index";

const createUser = async (email: string): Promise<User | undefined> => {
  const user = await User.findOne({ where: { email } });
  return user;
};

export default createUser;
