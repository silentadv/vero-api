import { MembersRepository } from "@/repositories/members-repository";
import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Member } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export interface RegisterMemberUseCaseRequest {
  userId: string;
  organizationId: string;
}

export interface RegisterMemberUseCaseResponse {
  member: Member;
}

export class RegisterMemberUseCase {
  public constructor(
    private membersRepository: MembersRepository,
    private usersRepository: UsersRepository,
    private organizationsRepository: OrganizationsRepository
  ) {}

  public async handle({
    userId,
    organizationId,
  }: RegisterMemberUseCaseRequest): Promise<RegisterMemberUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new ResourceNotFoundError("user");

    const organization = await this.organizationsRepository.findById(
      organizationId
    );
    if (!organization) throw new ResourceNotFoundError("organization");

    const member = await this.membersRepository.create({
      user_id: userId,
      organization_id: organizationId,
    });

    return { member };
  }
}
