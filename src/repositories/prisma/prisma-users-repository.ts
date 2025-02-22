import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  public async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({ data });
    return user;
  }
}
