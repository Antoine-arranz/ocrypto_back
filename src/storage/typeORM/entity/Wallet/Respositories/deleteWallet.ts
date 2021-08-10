import { Wallet } from "../index";

const deleteWallet = async (walletId: number): Promise<void> => {
  await Wallet.delete({ id: walletId });
};

export default deleteWallet;
