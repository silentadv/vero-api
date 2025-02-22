import { Prisma, Member, Role } from "@prisma/client";
import { MembersRepository } from "../members-repository";
import { randomUUID } from "crypto";

export class InMemoryMembersRepository implements MembersRepository {
  public items: Member[] = [];

  public async create(data: Prisma.MemberUncheckedCreateInput) {
    const member = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      organization_id: data.organization_id,
      role: data.role ?? Role.Member,
      createdAt: new Date(),
    } satisfies Member;

    this.items.push(member);

    return member;
  }
}
