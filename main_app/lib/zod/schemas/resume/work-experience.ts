import { z } from "zod";
import { TAGS } from "./constants";

export const WORK_EXPERIENCE_SCHEMA = z
  .array(
    z.object({
      company: z.string(),
      tags: TAGS,
      position: z.array(
        z.object({
          text: z.string(),
          tags: TAGS,
        })
      ),
      website: z.string().optional(),
      start_date: z.date(),
      end_date: z.date().optional(),
      summary: z.array(
        z.object({
          text: z.string(),
          tags: TAGS,
        })
      ),
      highlights: z.array(
        z.object({
          text: z.array(z.string()),
          tags: TAGS,
        })
      ),
    })
  )
  .optional();

export type WORK_EXPERIENCE_SCHEMA_TYPE = z.infer<typeof WORK_EXPERIENCE_SCHEMA>;
