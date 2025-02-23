import { z } from "zod";

export const serviceSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("create"),
    z.literal("update"),
    z.literal("delete"),
  ]),
  z.literal("Service"),
]);

export type ServiceSubject = z.infer<typeof serviceSubject>;
