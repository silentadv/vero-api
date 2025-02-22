import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterUserUseCase } from "./register-user";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/users-already-exists-error";

let usersRepository: InMemoryUsersRepostory;
let sut: RegisterUserUseCase;

describe("Register User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepostory();
    sut = new RegisterUserUseCase(usersRepository);
  });

  it("should be possible to register user.", async () => {
    const { user } = await sut.handle({
      username: "Silent",
      email: "silent@example.com",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be possible to register user with same email.", async () => {
    await sut.handle({
      username: "Silent",
      email: "silent@example.com",
    });

    await expect(() =>
      sut.handle({
        username: "Silent 2",
        email: "silent@example.com",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
