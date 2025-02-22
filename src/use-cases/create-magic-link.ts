import { MagicLinkPayload } from "@/@types/magic-link";
import { MagicLinksRepository } from "@/repositories/magic-links-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export interface CreateMagicLinkUseCaseRequest {
  email: string;
}
export interface CreateMagicLinkUseCaseResponse {
  payload: MagicLinkPayload;
}

export class CreateMagicLinkUseCase {
  public constructor(
    private magicLinksRepository: MagicLinksRepository,
    private usersRepository: UsersRepository
  ) {}

  public async handle({
    email,
  }: CreateMagicLinkUseCaseRequest): Promise<CreateMagicLinkUseCaseResponse> {
    const userExists = await this.usersRepository.findByEmail(email);
    if (!userExists) throw new ResourceNotFoundError("user");

    const payload = await this.magicLinksRepository.create(email);
    return { payload };
  }
}
