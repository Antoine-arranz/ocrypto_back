import MongoDb from "../../storage/mongoDB";

const revokeToken = async (token: string) => {
  const tokenWhiteList = await new MongoDb();

  await tokenWhiteList.deleteToken(token);

  return token;
};

export default revokeToken;
