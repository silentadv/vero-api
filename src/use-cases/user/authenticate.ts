import { MagicLinksRepository } from "@/repositories/magic-links-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

export interface AuthenticateUseCaseRequest {
  token: string;
}
export interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  public constructor(
    public usersRepository: UsersRepository,
    public magicLinksRepository: MagicLinksRepository
  ) {}
  public async handle({
    token,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const payload = await this.magicLinksRepository.find(token);
    if (!payload) throw new Error();

    const { email, expiresAt } = payload;

    if (Date.now() >= expiresAt) throw new Error();

    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new Error();

    return { user };
  }
}
