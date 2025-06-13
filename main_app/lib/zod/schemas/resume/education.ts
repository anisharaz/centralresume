import { z } from "zod";
import { TAGS } from "./constants";

export const EDUCATION_SCHEMA = z.array(
  z.object({
    institution: z.string().min(1, "Institution is required"),
    tags: TAGS,
    field: z.array(
      z.object({
        text: z.string().min(1, "Field text is required"),
        tags: TAGS,
      })
    ),
    degree_level: z.array(
      z.object({
        text: z.string().min(1, "Degree level text is required"),
        tags: TAGS,
      })
    ),
    startDate: z.string(),
    endDate: z.string(),
    score: z.string().optional(),
  })
);

export type EDUCATION_SCHEMA_TYPE = z.infer<typeof EDUCATION_SCHEMA>;
