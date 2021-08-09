import config from "..";

const authToken = (email: string) => ({
  email,
  exp: Date.now() + config.jwt.exp,
});

export default authToken;
