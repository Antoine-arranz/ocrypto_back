class CustomError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UserAlreadyExist extends CustomError {
  public httpCode = 403;

  constructor() {
    super(`This user already exist`);
  }
}

export class UserNotExist extends CustomError {
  public httpCode = 403;

  constructor() {
    super(`This user does not exist`);
  }
}

export class AuthenticationFailedError extends CustomError {
  public httpCode = 401;

  constructor() {
    super(`authentication failed, incorrect email or password`);
  }
}

export class AccountNotValidatedError extends CustomError {
  public httpCode = 403;

  constructor() {
    super(`you haven't validated your account yet`);
  }
}

export class AuthenticationError extends CustomError {
  public httpCode = 401;

  constructor() {
    super(`you must be authenticated to do this`);
  }
}

export class AccountAlreadyValidatedError extends CustomError {
  public httpCode = 406;

  constructor() {
    super(`your account is already validated`);
  }
}

export class TokenExpiredError extends CustomError {
  public httpCode = 403;

  constructor() {
    super(`the token has expired and is no longer valid`);
  }
}

export class WalletNotFound extends CustomError {
  public httpCode = 403;

  constructor() {
    super(`This wallet does not exist`);
  }
}
