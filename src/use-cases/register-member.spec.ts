import { InMemoryMembersRepository } from "@/repositories/in-memory/in-memory-members-repository";
import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterMemberUseCase } from "./register-member";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let membersRepository: InMemoryMembersRepository;
let usersRepository: InMemoryUsersRepostory;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterMemberUseCase;

describe("Register Member Use Case", () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository();
    usersRepository = new InMemoryUsersRepostory();
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterMemberUseCase(
      membersRepository,
      usersRepository,
      organizationsRepository
    );
  });

  it("shoud be able to register member on a organization", async () => {
    await usersRepository.create({
      id: "user-01",
      username: "silent",
      email: "silent@example.com",
    });

    await organizationsRepository.create({
      id: "organization-01",
      name: "Union Lab",
    });

    const { member } = await sut.handle({
      userId: "user-01",
      organizationId: "organization-01",
    });

    expect(member.id).toEqual(expect.any(String));
  });

  it("should not be able to register member if user not exists", async () => {
    await organizationsRepository.create({
      id: "organization-01",
      name: "Union Lab",
    });

    await expect(() =>
      sut.handle({
        userId: "user-01",
        organizationId: "organization-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to register member on non-existent organization", async () => {
    await usersRepository.create({
      id: "user-01",
      username: "silent",
      email: "silent@example.com",
    });

    await expect(() =>
      sut.handle({
        userId: "user-01",
        organizationId: "organization-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
