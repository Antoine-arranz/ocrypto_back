import { User } from "../index";

const findOneUserByEmail = async (email: string): Promise<User | undefined> => {
  const user = await User.findOne({ where: { email } });
  return user;
};

export default findOneUserByEmail;
