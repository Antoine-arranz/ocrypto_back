import { MongoClient } from "mongodb";
import { TokenI } from "../../interfaces/object";
import config from "../../config";
export default class MongoDbToken {
  public async findOne(data): Promise<TokenI> {
    const connect = await MongoClient.connect(config.database.mongodb.uri);
    const db = connect
      .db(config.database.mongodb.token)
      .collection(config.database.mongodb.tokenCollection);
    const result = await db.findOne(data);
    connect.close();
    return result as unknown as TokenI;
  }

  public async put(data) {
    const connect = await MongoClient.connect(config.database.mongodb.uri);
    const db = connect
      .db(config.database.mongodb.token)
      .collection(config.database.mongodb.tokenCollection);
    const result = await db.insertOne(data);
    connect.close();
    return result;
  }
  public async deleteToken(data) {
    const connect = await MongoClient.connect(config.database.mongodb.uri);
    const db = connect
      .db(config.database.mongodb.token)
      .collection(config.database.mongodb.tokenCollection);
    const result = await db.deleteOne({ token: data });
    connect.close();
    return result;
  }
}
