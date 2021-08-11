import { getOneWallet as getOneByIdWallet } from "../../../storage/typeORM/entity/Wallet/Respositories";
import { Wallet } from "../../../storage/typeORM/entity/Wallet";
const getOneWallet = async (walletId: number): Promise<Wallet | undefined> => {
  const wallet = await getOneByIdWallet(walletId);

  return wallet;
};

export default getOneWallet;
