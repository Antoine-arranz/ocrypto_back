import { findOneUser } from "../../../storage/typeORM/entity/User/Repositories";
import { User } from "../../../storage/typeORM/entity/User";

const findOne = async (email: string): Promise<User | undefined> => {
  const user = await findOneUser(email);

  return user;
};

export default findOne;
