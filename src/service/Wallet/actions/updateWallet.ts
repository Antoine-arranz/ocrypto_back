import { updateWallet as updateOneWallet } from "../../../storage/typeORM/entity/Wallet/Respositories";
import { Wallet } from "../../../storage/typeORM/entity/Wallet";
const updateWallet = async (wallet: Wallet, name: string): Promise<Wallet> => {
  const updatedWallet = await updateOneWallet(wallet, name);

  return updatedWallet;
};

export default updateWallet;
