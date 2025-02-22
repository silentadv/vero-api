import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";
import { CreateOrganizationUseCase } from "../create-organization";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeCreateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new CreateOrganizationUseCase(
    organizationsRepository,
    usersRepository
  );

  return useCase;
}
