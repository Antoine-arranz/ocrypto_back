import { findOneUserByEmail } from "../../../storage/typeORM/entity/User/Repositories";
import { User } from "../../../storage/typeORM/entity/User";

const findOneByEmail = async (email: string): Promise<User | undefined> => {
  const user = await findOneUserByEmail(email);

  return user;
};

export default findOneByEmail;
