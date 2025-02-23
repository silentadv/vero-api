import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Organization } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error";

export interface CreateOrganizationUseCaseRequest {
  name: string;
  slug: string;
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
    slug,
    ownerId,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const owner = await this.usersRepository.findById(ownerId);
    if (!owner) throw new ResourceNotFoundError("owner");

    const organizationWithSameSlug =
      await this.organizationsRepository.findBySlug(slug);
    if (organizationWithSameSlug) throw new OrganizationAlreadyExistsError();

    const organization = await this.organizationsRepository.create({
      name,
      slug,
    });

    return { organization };
  }
}
