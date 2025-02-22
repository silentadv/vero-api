import { makeCreateMagicLinkUseCase } from "@/use-cases/factories/make-create-magic-link-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const magicLinkBodySchema = z.object({
  email: z.string().email(),
});

export async function magicLink(request: FastifyRequest, reply: FastifyReply) {
  const { email } = magicLinkBodySchema.parse(request.body);

  const createMagicLinkUseCase = makeCreateMagicLinkUseCase();
  const { payload } = await createMagicLinkUseCase.handle({ email });

  reply.status(201).send({
    data: payload,
  });
}
