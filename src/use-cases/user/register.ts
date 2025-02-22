import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

export interface RegisterUseCaseRequest {
  username: string;
  email: string;
}
export interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  public constructor(public usersRepository: UsersRepository) {}
  public async handle({
    username,
    email,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) throw new Error();

    const user = await this.usersRepository.create({
      username,
      email,
    });

    return { user };
  }
}
