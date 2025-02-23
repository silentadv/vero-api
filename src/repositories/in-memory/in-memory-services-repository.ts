import { Prisma, Service } from "@prisma/client";
import { ServicesRepository } from "../services-repository";
import { randomUUID } from "crypto";

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Service[] = [];

  public async create(data: Prisma.ServiceUncheckedCreateInput) {
    const item = {
      id: data.id ?? randomUUID(),
      name: data.name,
      organization_id: data.organization_id,
    } as Service;

    this.items.push(item);

    return item;
  }
}
