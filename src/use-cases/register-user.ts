import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { UserAlreadyExistsError } from "./errors/users-already-exists-error";

export interface RegisterUserUseCaseRequest {
  username: string;
  email: string;
}
export interface RegisterUserUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  public constructor(private usersRepository: UsersRepository) {}
  public async handle({
    username,
    email,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) throw new UserAlreadyExistsError();

    const user = await this.usersRepository.create({
      username,
      email,
    });

    return { user };
  }
}
