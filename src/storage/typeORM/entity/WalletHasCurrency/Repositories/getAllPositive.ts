import { MoreThan } from "typeorm";
import WalletHasCurrency from "../WalletHasCurrency";

const getAllPositive = async (
  walletId: number
): Promise<Array<WalletHasCurrency>> => {
  const quantityTotal = await WalletHasCurrency.find({
    where: { Wallet_Id: walletId, currencyTotal: MoreThan(0) },
    relations: ["Currency"],
  });
  return quantityTotal;
};

export default getAllPositive;
