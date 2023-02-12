import { getWallets as getWalletsByUserId } from "../../../storage/typeORM/entity/Wallet/Respositories";
import { Wallet } from "../../../storage/typeORM/entity/Wallet";
const getWallets = async (userId: number): Promise<Array<Wallet>> => {
  const wallets = await getWalletsByUserId(userId);

  return wallets;
};

export default getWallets;
