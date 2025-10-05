import { z } from "zod";
import { TAGS } from "./constants";

export const PROJECTS_SCHEMA = z.array(
  z.object({
    title: z.string().min(1, "Title is required"),
    tags: TAGS,
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    summary: z.string(),
    url: z.string().optional(),
  })
);

export type PROJECTS_SCHEMA_TYPE = z.infer<typeof PROJECTS_SCHEMA>;
