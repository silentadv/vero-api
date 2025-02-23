import { Ability, AbilityBuilder, PureAbility, subject } from "@casl/ability";
import { OrganizationSubject } from "./subjects/organization";
import { ServiceSubject } from "./subjects/service";

export type AppAbility = PureAbility<OrganizationSubject | ServiceSubject>;
