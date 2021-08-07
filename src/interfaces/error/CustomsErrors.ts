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