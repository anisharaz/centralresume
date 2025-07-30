import { z } from "zod";
import { TAGS } from "./constants";

export const ACHIEVEMENT_SCHEMA = z.array(
  z.object({
    title: z.string().min(1, "Title is required"),
    tags: TAGS,
    date: z.string(),
    awarded_by: z.string().optional(),
    summary: z.array(
      z.object({
        text: z.string().min(1, "Summary text is required"),
        tags: TAGS,
      })
    ),
  })
);

export type ACHIEVEMENT_SCHEMA_TYPE = z.infer<typeof ACHIEVEMENT_SCHEMA>;
