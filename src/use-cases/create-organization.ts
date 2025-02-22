import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Organization } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export interface CreateOrganizationUseCaseRequest {
  name: string;
  ownerId: string;
}

export interface CreateOrganizationUseCaseResponse {
  organization: Organization;
}

export class CreateOrganizationUseCase {
  public constructor(
    private organizationsRepository: OrganizationsRepository,
    private usersRepository: UsersRepository
  ) {}
  public async handle({
    name,
    ownerId,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const owner = await this.usersRepository.findById(ownerId);
    if (!owner) throw new ResourceNotFoundError("owner");

    const organization = await this.organizationsRepository.create({
      name,
    });

    return { organization };
  }
}
