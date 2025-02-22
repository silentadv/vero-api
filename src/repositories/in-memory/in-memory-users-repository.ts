import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepostory implements UsersRepository {
  public items: User[] = [];

  public async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    return user || null;
  }

  public async findById(id: string) {
    const user = this.items.find((item) => item.id === id);
    return user || null;
  }

  public async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      username: data.username,
      email: data.email,
      createdAt: new Date(),
    } satisfies User;

    this.items.push(user);

    return user;
  }
}
