import { z } from "zod";
import { TAGS } from "./constants";

export const SKILLS_SCHEMA = z.object({
  soft: z.array(
    z.object({
      name: z.string(),
      level: z.string().optional(),
      tags: TAGS,
    })
  ),
  technical: z.array(
    z.object({
      name: z.string(),
      level: z.string().optional(),
      tags: TAGS,
    })
  ),
});

export type SKILLS_SCHEMA_TYPE = z.infer<typeof SKILLS_SCHEMA>;
