import { MongoClient } from "mongodb";
import config from "../../config";
export default class MongoDbToken {
  public _document;

  public async findOne(data) {
    const connect = await MongoClient.connect(config.database.mongodb.uri);
    const db = connect
      .db(config.database.mongodb.token)
      .collection(config.database.mongodb.tokenCollection);
    const result = await db.findOne(data);
    connect.close();
    return result;
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
}
