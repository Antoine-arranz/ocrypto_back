import { Wallet } from "../index";

const getWalletsByUserId = async (userId: number): Promise<Array<Wallet>> => {
  const wallets = await Wallet.find({
    where: { User_Id: userId },
  });
  return wallets;
};

export default getWalletsByUserId;
