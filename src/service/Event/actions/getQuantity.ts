import { WalletHasCurrency } from "../../../storage/typeORM/entity/WalletHasCurrency";
import { getQuantityTotal as getQuantity } from "../../../storage/typeORM/entity/WalletHasCurrency/Repositories";

const getQuantityTotal = async (
  walletId: number
): Promise<Array<WalletHasCurrency>> => {
  const quantityTotal = await getQuantity(walletId);

  return quantityTotal;
};

export default getQuantityTotal;
