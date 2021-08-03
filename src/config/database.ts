export default (env) => ({
  postgres: {
    type: env.DB_DEV_POSTGRES_OCRYPTO_TYPE,
    user: env.DB_DEV_POSTGRES_OCRYPTO_USER,
    password: env.DB_DEV_POSTGRES_OCRYPTO_PASSWORD,
    host: env.DB_DEV_POSTGRES_OCRYPTO_HOST,
    port: env.DB_DEV_POSTGRES_OCRYPTO_PORT,
    name: env.DB_DEV_POSTGRES_OCRYPTO_NAME,
  },
  mongodb: {
    uri: `mongodb+srv://ocrypto:${env.DB_DEV_MONGODB_OCRYPTO_PASSWORD}@cluster0.ndvfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    token: `token`,
    tokenCollection: `userToken`,
  },
});
