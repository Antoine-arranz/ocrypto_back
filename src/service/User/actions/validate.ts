import { User } from "../../../storage/typeORM/entity/User";

const validation = async (User: User): Promise<void> => {
  User.verified = true;
  User.save();
};
export default validation;
