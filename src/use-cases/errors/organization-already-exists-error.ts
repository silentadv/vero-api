export class OrganizationAlreadyExistsError extends Error {
  public constructor() {
    super("Already exists an organization with same slug.");
  }
}
