import { Prisma, Member } from "@prisma/client";
import { MembersRepository } from "../members-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMembersRepository implements MembersRepository {
  public async findById(id: string) {
    const member = await prisma.member.findUnique({
      where: { id },
    });

    return member;
  }

  public async create(data: Prisma.MemberUncheckedCreateInput) {
    const member = await prisma.member.create({ data });
    return member;
  }
}
