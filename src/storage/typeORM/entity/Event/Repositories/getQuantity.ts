import { getManager } from "typeorm";
const getQuantity = async (walletId: number): Promise<any> => {
  const entityManager = getManager();

  const quantityTotal = await entityManager.query(`
 SELECT * FROM quantity_total WHERE "Wallet_Id"=${walletId}`);

  return quantityTotal;
};

export default getQuantity;
