import { MagicLinkPayload } from "@/@types/magic-link";
import { MagicLinksRepository } from "../magic-links-repository";
import { redis } from "@/lib/redis";
import { randomUUID } from "crypto";

export class RedisMagicLinksRepository implements MagicLinksRepository {
  public async find(token: string) {
    const payload = await redis.get(token);
    if (!payload) return null;

    return JSON.parse(payload) as MagicLinkPayload;
  }

  public async create(email: string) {
    const payload = {
      email,
      expiresAt: Date.now() + 20 * 60 * 1000,
      token: randomUUID(),
    } satisfies MagicLinkPayload;

    await redis.set(payload.token, JSON.stringify(payload));
    return payload.token;
  }
}
