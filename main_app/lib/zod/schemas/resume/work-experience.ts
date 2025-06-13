import { z } from "zod";
import { TAGS } from "./constants";

export const WORK_EXPERIENCE_SCHEMA = z.array(
  z.object({
    company: z.string().min(1, "Company name is required"),
    tags: TAGS,
    position: z.array(
      z.object({
        text: z.string().min(1, "Position text is required"),
        tags: TAGS,
      })
    ),
    website: z.string().optional(),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().optional(),
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
);

export type WORK_EXPERIENCE_SCHEMA_TYPE = z.infer<
  typeof WORK_EXPERIENCE_SCHEMA
>;
