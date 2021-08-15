import { getManager } from "typeorm";
import { getQuantity } from "../../../storage/typeORM/entity/Event/Repositories";
const getQuantityTotal = async (walletId: number): Promise<any> => {
  const quantityTotal = await getQuantity(walletId);

  return quantityTotal;
};

export default getQuantityTotal;
