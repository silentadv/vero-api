import { InMemoryMagicLinksRepository } from "@/repositories/in-memory/in-memory-magic-links-repository";
import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-users-repository";
import { CreateMagicLinkUseCase } from "./create-magic-link";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let magicLinksRepository: InMemoryMagicLinksRepository;
let usersRepository: InMemoryUsersRepostory;
let sut: CreateMagicLinkUseCase;

describe("Create Magic Link Use Case", () => {
  beforeEach(() => {
    magicLinksRepository = new InMemoryMagicLinksRepository();
    usersRepository = new InMemoryUsersRepostory();
    sut = new CreateMagicLinkUseCase(magicLinksRepository, usersRepository);
  });

  it("should be able to create magic-link", async () => {
    await usersRepository.create({
      id: "user-01",
      username: "silent",
      email: "silent@example.com",
    });

    const { payload } = await sut.handle({
      email: "silent@example.com",
    });

    expect(payload.token).toEqual(expect.any(String));
  });

  it("should not be able to create magic-link with non-registered email.", async () => {
    await expect(() =>
      sut.handle({
        email: "silent@example.com",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
