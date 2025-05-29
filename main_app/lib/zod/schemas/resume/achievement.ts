import { z } from "zod";
import { TAGS } from "./index";

export const ACHIEVEMENT_SCHEMA = z
  .array(
    z.object({
      title: z.string(),
      tags: TAGS,
      date: z.date(),
      awarded_by: z.string().optional(),
      summary: z
        .array(
          z.object({
            text: z.string(),
            tags: TAGS,
          })
        )
        .optional(),
    })
  )
  .optional();

export type ACHIEVEMENT_SCHEMA_TYPE = z.infer<typeof ACHIEVEMENT_SCHEMA>;