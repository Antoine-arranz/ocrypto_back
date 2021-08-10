import { Wallet } from "../../storage/typeORM/entity/Wallet";
import * as walletActions from "./actions";

class WalletService {
  public async create(userId: number, name: string): Promise<Wallet> {
    const wallet = await walletActions.createWallet(userId, name);
    return wallet;
  }

  public async getWallets(userId: number): Promise<Array<Wallet>> {
    const wallet = await walletActions.getWallets(userId);
    return wallet;
  }

  public async deleteWallet(walletId: number): Promise<void> {
    await walletActions.deleteWallet(walletId);
  }
}

export default WalletService;
