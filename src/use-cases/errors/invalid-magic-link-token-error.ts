export class InvalidMagicLinkToken extends Error {
  public constructor() {
    super("Invalid magic-link token has provided.");
  }
}
