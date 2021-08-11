import { Wallet } from "../index";

const updateWallet = async (wallet: Wallet, name: string): Promise<Wallet> => {
  wallet.name = name;
  wallet.save();
  return wallet;
};

export default updateWallet;
