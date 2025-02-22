import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { magicLink } from "./magic-link";

export function userRoutes(app: FastifyInstance) {
  app.post("/", register);
  app.post("/magic-link", magicLink);
  app.post("/sessions", authenticate);
}
