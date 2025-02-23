import { MembersRepository } from "@/repositories/members-repository";
import { ServicesRepository } from "@/repositories/services-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getMemberPermissions } from "@/lib/casl";
import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { Service } from "@prisma/client";
import { UnauthorizedError } from "./errors/unauthorized-error";

export interface CreateServiceUseCaseRequest {
  name: string;
  memberId: string;
  organizationId: string;
}
export interface CreateServiceUseCaseResponse {
  service: Service;
}

export class CreateServiceUseCase {
  public constructor(
    private servicesRepository: ServicesRepository,
    private membersRepository: MembersRepository,
    private organizationsRepository: OrganizationsRepository
  ) {}
  public async handle({
    name,
    memberId,
    organizationId,
  }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const member = await this.membersRepository.findById(memberId);
    if (!member) throw new ResourceNotFoundError("member");

    const organization = await this.organizationsRepository.findById(
      organizationId
    );
    if (!organization) throw new ResourceNotFoundError("organization");

    if (member.organization_id !== organization.id)
      throw new UnauthorizedError();

    const permissions = getMemberPermissions(member.role);
    const isMemberAllowed = permissions.can("create", "Service");
    if (!isMemberAllowed) throw new UnauthorizedError();

    const service = await this.servicesRepository.create({
      name,
      organization_id: organizationId,
    });

    return { service };
  }
}
