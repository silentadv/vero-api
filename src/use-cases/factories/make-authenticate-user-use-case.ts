import { AuthenticateUserUseCase } from "../authenticate-user";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RedisMagicLinksRepository } from "@/repositories/redis/redis-magic-links-repository";

export function makeAuthenticateUserUseCase() {
  const magicLinksRepository = new RedisMagicLinksRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new AuthenticateUserUseCase(
    usersRepository,
    magicLinksRepository
  );

  return useCase;
}
