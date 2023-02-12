import { User } from "../../../storage/typeORM/entity/User";
import { UserUpdateI } from "../../../interfaces/object";
import { updateData as updateUser } from "../../../storage/typeORM/entity/User/Repositories";
const updateData = async (
  userId: number,
  data: UserUpdateI
): Promise<User | void> => {
  const user = await updateUser(userId, data);

  return user;
};

export default updateData;
