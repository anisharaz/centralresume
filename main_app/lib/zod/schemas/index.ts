import { z } from "zod";
import { RESUME_ZOD_SCHEMA } from "./resume";

export const createOauthClientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  redirectUri: z.string().url("Please enter a valid URL"),
  icon: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional(),
});

export { RESUME_ZOD_SCHEMA };
export type RESUME_TYPE = z.infer<typeof RESUME_ZOD_SCHEMA>;
