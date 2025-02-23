import { makeCreateOrganizationUseCase } from "@/use-cases/factories/make-create-organization-use-case";
import { makeRegisterMemberUseCase } from "@/use-cases/factories/make-register-member-use-case";
import { Role } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createOrganizationBodySchema = z.object({
  name: z.string().min(3).max(30),
  slug: z.string().min(3),
  ownerId: z.string(),
});

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, slug, ownerId } = createOrganizationBodySchema.parse(
    request.body
  );

  const createOrganizationUseCase = makeCreateOrganizationUseCase();
  const { organization } = await createOrganizationUseCase.handle({
    name,
    ownerId,
    slug,
  });

  const registerMemberUseCase = makeRegisterMemberUseCase();
  const { member } = await registerMemberUseCase.handle({
    userId: ownerId,
    organizationId: organization.id,
    role: Role.Owner,
  });

  return reply.status(201).send({
    data: { ...organization, members: [member] },
  });
}
