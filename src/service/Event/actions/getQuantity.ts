import { getManager } from "typeorm";
import { getQuantityTotal as getQuantity } from "../../../storage/typeORM/entity/WalletHasCurrency/Repositories";
const getQuantityTotal = async (walletId: number): Promise<any> => {
  const quantityTotal = await getQuantity(walletId);

  return quantityTotal;
};

export default getQuantityTotal;
