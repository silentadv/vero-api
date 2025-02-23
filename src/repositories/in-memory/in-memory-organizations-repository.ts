import { Prisma, Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";
import { randomUUID } from "crypto";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = [];

  public async findById(id: string) {
    const organization = this.items.find((item) => item.id === id);
    return organization || null;
  }

  public async findBySlug(slug: string) {
    const organization = this.items.find((item) => item.slug === slug);
    return organization || null;
  }

  public async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      slug: data.slug,
      createdAt: new Date(),
    } satisfies Organization;

    this.items.push(organization);

    return organization;
  }
}
