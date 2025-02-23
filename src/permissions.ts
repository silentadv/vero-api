import { Member, Role } from "@prisma/client";
import { AbilityBuilder } from "@casl/ability";
import { AppAbility } from "./abilities";

type MemberPermissions = (builder: AbilityBuilder<AppAbility>) => void;

export const permissions: Record<Role, MemberPermissions> = {
  Owner({ can, cannot }) {
    can("manage", "Organization");
    can("manage", "Service");
  },
  Admin({ can, cannot }) {
    can("manage", "Organization");
    cannot("transfer_ownership", "Organization");
    cannot("delete", "Organization");
    can("manage", "Service");
  },
  Member({ can, cannot }) {
    cannot("manage", "Service");
  },
};
