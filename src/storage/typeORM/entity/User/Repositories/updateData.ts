import { UserUpdateI } from "src/interfaces/object";
import { User } from "../index";

const updateData = async (
  userId: number,
  data: UserUpdateI
): Promise<User | void> => {
  await User.update(
    { id: userId },
    {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    }
  );

  const user = User.findOne({ where: { id: userId } });
  if (user) {
    return user;
  }
};

export default updateData;
