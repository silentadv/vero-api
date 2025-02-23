import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";
import { UserAlreadyExistsError } from "./use-cases/errors/users-already-exists-error";
import { InvalidMagicLinkToken } from "./use-cases/errors/invalid-magic-link-token-error";
import { ResourceNotFoundError } from "./use-cases/errors/resource-not-found-error";
import { OrganizationAlreadyExistsError } from "./use-cases/errors/organization-already-exists-error";

export const app = fastify();

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError)
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });

  if (error instanceof ResourceNotFoundError)
    return reply.status(400).send({
      message: "Resource not found, invalid body has provided.",
    });

  if (error instanceof UserAlreadyExistsError)
    return reply.status(409).send({
      message: error.message,
    });

  if (error instanceof OrganizationAlreadyExistsError)
    return reply.status(409).send({
      message: error.message,
    });

  if (error instanceof InvalidMagicLinkToken)
    return reply.status(401).send({
      message: error.message,
    });

  if (env.NODE_ENV !== "prod") console.error(error);

  return reply.status(500).send({
    message: "Internal server error.",
  });
});

app.register(appRoutes);
