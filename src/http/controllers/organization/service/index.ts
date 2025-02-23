import { FastifyInstance } from "fastify";
import { create } from "./create";

export function serviceRoutes(app: FastifyInstance) {
  app.post("/", create);
}
