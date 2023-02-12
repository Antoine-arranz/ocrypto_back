import { createWallet as createNewWallet } from "../../../storage/typeORM/entity/Wallet/Respositories";
import { Wallet } from "../../../storage/typeORM/entity/Wallet";
const createWallet = async (userId: number, name: string): Promise<Wallet> => {
  const newWallet = await createNewWallet(userId, name);

  return newWallet;
};

export default createWallet;
