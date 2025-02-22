import { Member, Prisma } from "@prisma/client";

export interface MembersRepository {
  create(data: Prisma.MemberUncheckedCreateInput): Promise<Member>;
}
