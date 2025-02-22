import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-users-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryMagicLinksRepository } from "@/repositories/in-memory/in-memory-magic-links-repository";
import { AuthenticateUseCase } from "./authenticate";

let usersRepository: InMemoryUsersRepostory;
let magicLinksRepository: InMemoryMagicLinksRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepostory();
    magicLinksRepository = new InMemoryMagicLinksRepository();
    sut = new AuthenticateUseCase(usersRepository, magicLinksRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      username: "silent",
      email: "silent@example.com",
    });

    const token = await magicLinksRepository.create("silent@example.com");

    const { user } = await sut.handle({
      token,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with an invalid token", async () => {
    await expect(() =>
      sut.handle({
        token: "invalid-token",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to authenticate with an expired token", async () => {
    await usersRepository.create({
      username: "silent",
      email: "silent@example.com",
    });

    const token = await magicLinksRepository.create("silent@example.com");
    vi.advanceTimersByTime(21 * 60 * 1000); // 21 minutes

    await expect(() => sut.handle({ token })).rejects.toBeInstanceOf(Error);
  });
});
