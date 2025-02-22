import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register";
import { beforeEach, describe, expect, it } from "vitest";

let usersRepository: InMemoryUsersRepostory;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepostory();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be possible to register.", async () => {
    const { user } = await sut.handle({
      username: "Silent",
      email: "silent@example.com",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be possible to register with same email.", async () => {
    await sut.handle({
      username: "Silent",
      email: "silent@example.com",
    });

    await expect(() =>
      sut.handle({
        username: "Silent 2",
        email: "silent@example.com",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
