import { Organization, Prisma } from "@prisma/client";

export interface OrganizationsRepository {
  findBySlug(slug: string): Promise<Organization | null>;
  findById(id: string): Promise<Organization | null>;
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>;
}
