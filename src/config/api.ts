export default (env) => ({
  protocol: env.URL_API_PROTOCOL,
  body: env.URL_API_BODY,
  port: env.URL_API_PORT,
  full: env.URL_API_FULL,

  front: {
    protocol: env.URL_FRONT_PROTOCOL,
    body: env.URL_FRONT_BODY,
    port: env.URL_FRONT_PORT,
    full: env.URL_FRONT_FULL,
  },
});
