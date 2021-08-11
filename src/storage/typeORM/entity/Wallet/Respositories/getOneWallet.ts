import { Wallet } from "../index";

const getOneWallet = async (walletId: number): Promise<Wallet | undefined> => {
  const wallet = await Wallet.findOne({
    where: { id: walletId },
  });
  return wallet;
};

export default getOneWallet;
