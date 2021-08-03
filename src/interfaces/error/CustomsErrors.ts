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
