export default (env) => ({
  postgres: {
    type: env.DB_DEV_OCRYPTO_TYPE,
    user: env.DB_DEV_OCRYPTO_USER,
    password: env.DB_DEV_OCRYPTO_PASSWORD,
    host: env.DB_DEV_OCRYPTO_HOST,
    port: env.DB_DEV_OCRYPTO_PORT,
    name: env.DB_DEV_OCRYPTO_NAME,
  },
});
