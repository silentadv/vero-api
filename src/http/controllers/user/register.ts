import { makeRegisterUserUseCase } from "@/use-cases/factories/make-register-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const registerBodySchema = z.object({
  username: z.string().min(3).max(25),
  email: z.string().email(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { username, email } = registerBodySchema.parse(request.body);

  const registerUserUseCase = makeRegisterUserUseCase();
  const { user } = await registerUserUseCase.handle({
    username,
    email,
  });

  reply.status(201).send({
    data: user,
  });
}
