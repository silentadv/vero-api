import { MagicLinkPayload } from "@/@types/magic-link";
import { MagicLinksRepository } from "../magic-links-repository";
import { randomUUID } from "crypto";

export class InMemoryMagicLinksRepository implements MagicLinksRepository {
  public items: MagicLinkPayload[] = [];

  public async find(token: string) {
    const payload = this.items.find((item) => item.token === token);
    return payload || null;
  }

  public async create(email: string) {
    const payload = {
      email,
      token: randomUUID(),
      expiresAt: Date.now() + 1000 * 60 * 20,
    } satisfies MagicLinkPayload;

    this.items.push(payload);

    return payload;
  }
}
