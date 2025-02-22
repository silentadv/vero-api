import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RedisMagicLinksRepository } from "@/repositories/redis/redis-magic-links-repository";
import { CreateMagicLinkUseCase } from "../create-magic-link";

export function makeCreateMagicLinkUseCase() {
  const magicLinksRepository = new RedisMagicLinksRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new CreateMagicLinkUseCase(
    magicLinksRepository,
    usersRepository
  );

  return useCase;
}
