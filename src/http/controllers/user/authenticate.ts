import { makeAuthenticateUserUseCase } from "@/use-cases/factories/make-authenticate-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const authenticateBodySchema = z.object({
  token: z.string(),
});

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { token } = authenticateBodySchema.parse(request.body);

  const authenticateUserUseCase = makeAuthenticateUserUseCase();
  const { user } = await authenticateUserUseCase.handle({
    token,
  });

  return reply.status(200).send({
    data: user,
  });
}
