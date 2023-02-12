import { WalletNotFound } from "../../interfaces/error/CustomsErrors";
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

  public async update(walletId: number, name: string): Promise<Wallet> {
    const wallet = await walletActions.getOneWallet(walletId);

    if (!wallet) throw new WalletNotFound();

    const walletUpdated = await walletActions.updateWallet(wallet, name);
    return walletUpdated;
  }
}

export default WalletService;
