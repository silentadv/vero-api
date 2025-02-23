import { AppAbility } from "@/abilities";
import { permissions } from "@/permissions";
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { Role } from "@prisma/client";

export function getMemberPermissions(role: Role) {
  const ability = new AbilityBuilder<AppAbility>(PureAbility);
  permissions[role](ability);

  return ability.build();
}
