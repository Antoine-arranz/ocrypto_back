import { deleteWallet as deleteOneWallet } from "../../../storage/typeORM/entity/Wallet/Respositories";
import { Wallet } from "../../../storage/typeORM/entity/Wallet";
const deleteWallet = async (walletId: number): Promise<void> => {
  await deleteOneWallet(walletId);
};

export default deleteWallet;
