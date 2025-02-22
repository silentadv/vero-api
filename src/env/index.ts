import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
  PORT: z.number().default(3000),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("❌ Invalid env variables.", _env.error.format());
  throw new Error("Invalid env variables.");
}

export const env = _env.data;
