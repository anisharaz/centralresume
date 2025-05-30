import { z } from "zod";
import { TAGS } from "./constants";

export const EDUCATION_SCHEMA = z.array(
  z.object({
    institution: z.string(),
    tags: TAGS,
    field: z.array(
      z.object({
        text: z.string(),
        tags: TAGS,
      })
    ),
    degree_level: z.array(
      z.object({
        text: z.string(),
        tags: TAGS,
      })
    ),
    startDate: z.string(),
    endDate: z.string(),
    score: z.string(),
  })
);

export type EDUCATION_SCHEMA_TYPE = z.infer<typeof EDUCATION_SCHEMA>;
