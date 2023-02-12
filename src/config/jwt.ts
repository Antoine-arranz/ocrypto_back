export default (env) => ({
  secret: env.SECRET,
  exp: parseInt(env.JWT_EXPIRATION, 10),

  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: parseInt(env.COOKIE_EXPIRATION, 10),
  },
});
