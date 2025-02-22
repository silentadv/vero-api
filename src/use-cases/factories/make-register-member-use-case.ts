import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterMemberUseCase } from "../register-member";
import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members-repository";

export function makeRegisterMemberUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const usersRepository = new PrismaUsersRepository();
  const membersRepository = new PrismaMembersRepository();
  const useCase = new RegisterMemberUseCase(
    membersRepository,
    usersRepository,
    organizationsRepository
  );

  return useCase;
}
