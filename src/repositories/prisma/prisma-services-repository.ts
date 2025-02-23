import { Prisma, Service } from "@prisma/client";
import { ServicesRepository } from "../services-repository";
import { prisma } from "@/lib/prisma";

export class PrismaServicesRepository implements ServicesRepository {
  public async create(data: Prisma.ServiceUncheckedCreateInput) {
    const service = await prisma.service.create({ data });
    return service;
  }
}
