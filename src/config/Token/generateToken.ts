import jwt from "jsonwebtoken";

import MongoDb from "../../storage/mongoDB";
import config from "../../config";

const generateToken = async (payload) => {
  const tokenWhiteList = new MongoDb();
  const token: string = jwt.sign(payload, config.jwt.secret);

  const params = {
    token,
    createdAt: Date(),
    ...(payload.exp && { expiration: Math.round(payload.exp / 1000) }),
  };

  await tokenWhiteList.put(params);

  return token;
};

export default generateToken;
