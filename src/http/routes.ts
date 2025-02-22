import { FastifyInstance } from "fastify";
import { userRoutes } from "./controllers/user";

export function appRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/users" });
}
