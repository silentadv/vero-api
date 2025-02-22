import { RedisMagicLinksRepository } from "@/repositories/redis/redis-magic-links-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const magicLinkBodySchema = z.object({
  email: z.string().email(),
});

export async function magicLink(request: FastifyRequest, reply: FastifyReply) {
  const { email } = magicLinkBodySchema.parse(request.body);

  const magicLinksRepository = new RedisMagicLinksRepository();
  const token = await magicLinksRepository.create(email);

  reply.status(201).send({
    token,
  });
}
