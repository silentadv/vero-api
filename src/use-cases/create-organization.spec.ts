import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrganizationUseCase } from "./create-organization";
import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let organizationsRepository: InMemoryOrganizationsRepository;
let usersRepository: InMemoryUsersRepostory;
let sut: CreateOrganizationUseCase;

describe("Create Organization Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    usersRepository = new InMemoryUsersRepostory();
    sut = new CreateOrganizationUseCase(
      organizationsRepository,
      usersRepository
    );
  });

  it("shoud be able to create a organization", async () => {
    await usersRepository.create({
      id: "user-01",
      email: "silent@example.com",
      username: "silent",
    });

    const { organization } = await sut.handle({
      name: "Union Lab",
      ownerId: "user-01",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("shoud not be able to create an organization with non-existent onwer.", async () => {
    await expect(() =>
      sut.handle({
        name: "Union Lab",
        ownerId: "user-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
