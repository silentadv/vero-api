export class UserAlreadyExistsError extends Error {
  public constructor() {
    super("Already exists an user with same email.");
  }
}
