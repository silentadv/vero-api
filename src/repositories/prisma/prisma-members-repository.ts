import { Prisma, Member } from "@prisma/client";
import { MembersRepository } from "../members-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMembersRepository implements MembersRepository {
  public async create(data: Prisma.MemberUncheckedCreateInput) {
    const member = await prisma.member.create({ data });
    return member;
  }
}
