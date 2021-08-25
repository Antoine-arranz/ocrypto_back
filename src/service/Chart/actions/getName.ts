import { getName } from "../../../storage/typeORM/entity/WalletHasCurrency/Repositories";
import { WalletHasCurrency } from "../../../storage/typeORM/entity/WalletHasCurrency";
const getQuantityName = async (walletId: number): Promise<Array<WalletHasCurrency>> => {
  const name = await getName(walletId);
  return name;
};

export default getQuantityName;
