import { UserCreateI } from "../../interfaces/object";
import * as userActions from "./actions";

class UserService {
  public async create(data: UserCreateI) {
    const user = await userActions.createUser(data);
    return user;
  }
}

export default UserService;
