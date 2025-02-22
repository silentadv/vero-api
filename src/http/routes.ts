import { FastifyInstance } from "fastify";
import { userRoutes } from "./controllers/user";
import { organizationRoutes } from "./controllers/organization";

export function appRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/user" });
  app.register(organizationRoutes, { prefix: "/organization" });
}
