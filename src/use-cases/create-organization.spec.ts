import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrganizationUseCase } from "./create-organization";
import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error";

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
      slug: "union-lab",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should not be able to create an organization with non-existent onwer.", async () => {
    await expect(() =>
      sut.handle({
        name: "Union Lab",
        ownerId: "user-01",
        slug: "union-lab",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to create an organization with same slug", async () => {
    await usersRepository.create({
      id: "user-01",
      email: "silent@example.com",
      username: "silent",
    });

    await sut.handle({
      name: "Union Lab 1",
      ownerId: "user-01",
      slug: "union-lab",
    });

    await expect(() =>
      sut.handle({
        name: "Union Lab 2",
        ownerId: "user-01",
        slug: "union-lab",
      })
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError);
  });
});
