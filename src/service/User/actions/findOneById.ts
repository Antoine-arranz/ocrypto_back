import { findOneUserById } from "../../../storage/typeORM/entity/User/Repositories";
import { User } from "../../../storage/typeORM/entity/User";

const findOneById = async (userId: number): Promise<User | undefined> => {
  const user = await findOneUserById(userId);

  return user;
};

export default findOneById;
