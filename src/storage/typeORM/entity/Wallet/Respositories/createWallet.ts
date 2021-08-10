import { Wallet } from "../index";

const createWallet = async (userId: number, name: string): Promise<Wallet> => {
  const wallet = await Wallet.create({ User_Id: userId, name }).save();
  return wallet;
};

export default createWallet;
