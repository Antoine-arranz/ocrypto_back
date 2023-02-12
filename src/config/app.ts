export default (env) => ({
  env: env.NODE_ENV,
  hash: parseInt(env.HASH, 10),
});
