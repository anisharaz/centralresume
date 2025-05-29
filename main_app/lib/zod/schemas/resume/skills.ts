import { z } from "zod";
import { TAGS } from "./index";

export const SKILLS_SCHEMA = z
  .object({
    soft: z
      .array(
        z.object({
          name: z.string(),
          level: z.string().optional(),
          tags: TAGS,
        })
      )
      .optional(),
    technical: z
      .array(
        z.object({
          name: z.string(),
          level: z.string().optional(),
          tags: TAGS,
        })
      )
      .optional(),
  })
  .optional();

export type SKILLS_SCHEMA_TYPE = z.infer<typeof SKILLS_SCHEMA>;
