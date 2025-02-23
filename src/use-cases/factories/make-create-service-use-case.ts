import { PrismaServicesRepository } from "@/repositories/prisma/prisma-services-repository";
import { CreateServiceUseCase } from "../create-service";
import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members-repository";
import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";

export function makeCreateServiceUseCase() {
  const servicesRepository = new PrismaServicesRepository();
  const membersRepository = new PrismaMembersRepository();
  const organizationsRepository = new PrismaOrganizationsRepository();
  const useCase = new CreateServiceUseCase(
    servicesRepository,
    membersRepository,
    organizationsRepository
  );

  return useCase;
}
