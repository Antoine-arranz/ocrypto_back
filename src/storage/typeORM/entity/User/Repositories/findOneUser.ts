import { User } from "../index";

const createUser = async (email: string): Promise<User | undefined> => {
  const user = await User.findOne({ where: { email } });
  console.log(user);
  return user;
};

export default createUser;
