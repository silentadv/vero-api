import { MagicLinksRepository } from "@/repositories/magic-links-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InvalidMagicLinkToken } from "./errors/invalid-magic-link-token-error";

export interface AuthenticateUserUseCaseRequest {
  token: string;
}
export interface AuthenticateUserUseCaseResponse {
  user: User;
}

export class AuthenticateUserUseCase {
  public constructor(
    private usersRepository: UsersRepository,
    private magicLinksRepository: MagicLinksRepository
  ) {}
  public async handle({
    token,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const payload = await this.magicLinksRepository.find(token);
    if (!payload) throw new InvalidMagicLinkToken();

    const { email, expiresAt } = payload;

    if (Date.now() >= expiresAt) throw new Error();

    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new ResourceNotFoundError("user");

    return { user };
  }
}
