import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  public async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    return organization;
  }

  public async findBySlug(slug: string) {
    const organization = await prisma.organization.findUnique({
      where: { slug },
    });

    return organization;
  }

  public async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = await prisma.organization.create({ data });
    return organization;
  }
}
