import { FastifyInstance } from "fastify";
import { create } from "./create";
import { serviceRoutes } from "./service";

export function organizationRoutes(app: FastifyInstance) {
  app.post("/", create);
  app.register(serviceRoutes, { prefix: "/services" });
}
