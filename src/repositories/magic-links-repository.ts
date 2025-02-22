import { MagicLinkPayload } from "@/@types/magic-link";

export interface MagicLinksRepository {
  find(token: string): Promise<MagicLinkPayload | null>;
  create(email: string): Promise<MagicLinkPayload>;
}
