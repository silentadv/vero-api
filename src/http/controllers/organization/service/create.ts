import { makeCreateServiceUseCase } from "@/use-cases/factories/make-create-service-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const createServiceBodySchema = z.object({
  name: z.string().min(3).max(30),
  memberId: z.string(),
  organizationId: z.string(),
});

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, memberId, organizationId } = createServiceBodySchema.parse(
    request.body
  );

  const createServiceUseCase = makeCreateServiceUseCase();
  const { service } = await createServiceUseCase.handle({
    name,
    memberId,
    organizationId,
  });

  return reply.status(201).send({
    data: service,
  });
}
