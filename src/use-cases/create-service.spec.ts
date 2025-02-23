import { describe, expect, it, beforeEach } from "vitest";
import { CreateServiceUseCase } from "./create-service";
import { InMemoryMembersRepository } from "@/repositories/in-memory/in-memory-members-repository";
import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { InMemoryServicesRepository } from "@/repositories/in-memory/in-memory-services-repository";
import { Role } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let servicesRepository: InMemoryServicesRepository;
let membersRepository: InMemoryMembersRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: CreateServiceUseCase;

describe("Create Service Use Case", () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository();
    membersRepository = new InMemoryMembersRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new CreateServiceUseCase(
      servicesRepository,
      membersRepository,
      organizationsRepository
    );
  });

  it("should be possible to create service", async () => {
    await membersRepository.create({
      id: "member-01",
      user_id: "user-01",
      organization_id: "organization-01",
      role: Role.Admin,
    });

    await organizationsRepository.create({
      id: "organization-01",
      name: "Union Lab",
      slug: "union-lab",
    });

    const { service } = await sut.handle({
      name: "Limpeza",
      memberId: "member-01",
      organizationId: "organization-01",
    });

    expect(service.id).toEqual(expect.any(String));
  });

  it("should not be possible to non-existent member create an service.", async () => {
    await organizationsRepository.create({
      name: "Union Lab",
      slug: "union-lab",
    });

    await expect(() =>
      sut.handle({
        name: "Limpeza",
        memberId: "member-01",
        organizationId: "organization-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be possible to create an service on a non-existent organization.", async () => {
    await membersRepository.create({
      id: "member-01",
      user_id: "user-01",
      organization_id: "organization-01",
      role: Role.Admin,
    });

    await expect(() =>
      sut.handle({
        name: "Limpeza",
        memberId: "member-01",
        organizationId: "organization-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be possible to create an service with member role", async () => {
    await membersRepository.create({
      id: "member-01",
      user_id: "user-01",
      organization_id: "organization-01",
    });

    await organizationsRepository.create({
      name: "Union Lab",
      slug: "union-lab",
    });

    await expect(() =>
      sut.handle({
        name: "Limpeza",
        memberId: "member-01",
        organizationId: "organization-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be possible to create an service in an organization that user is not a member.", async () => {
    await membersRepository.create({
      id: "member-01",
      user_id: "user-01",
      organization_id: "organization-02",
    });

    await organizationsRepository.create({
      id: "organization-01",
      name: "Union Lab",
      slug: "union-lab",
    });

    await expect(() =>
      sut.handle({
        name: "Limpeza",
        memberId: "member-01",
        organizationId: "organization-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
