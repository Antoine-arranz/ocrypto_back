import { User } from "../index";

const findOneUserById = async (id: number): Promise<User | undefined> => {
  const user = await User.findOne({ where: { id } });
  return user;
};

export default findOneUserById;
