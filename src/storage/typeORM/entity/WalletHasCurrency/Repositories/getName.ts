import { createQueryBuilder, MoreThan } from "typeorm";
import WalletHasCurrency from "../WalletHasCurrency";

const getName = async (
  walletId: number
): Promise<Array<WalletHasCurrency>> => {
  const quantityTotal = await createQueryBuilder(WalletHasCurrency).where('WalletHasCurrency.Wallet_Id = :walletId',{walletId}).select('WalletHasCurrency.Currency_Id').getMany()
  
  return quantityTotal;
};

export default getName;
