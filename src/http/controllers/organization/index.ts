import { FastifyInstance } from "fastify";
import { create } from "./create";

export function organizationRoutes(app: FastifyInstance) {
  app.post("/", create);
}
