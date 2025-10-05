import { z } from "zod";
import { TAGS } from "./constants";

export const OTHER_LIST_SCHEMA = z.array(
  z.object({
    tags: TAGS,
    heading: z.array(
      z.object({
        text: z.string().min(1, "Heading text is required"),
        tags: TAGS,
      })
    ),
    summary: z.array(
      z.object({
        text: z.string().min(1, "Summary text is required"),
        tags: TAGS,
      })
    ),
  })
);

export type OTHER_LIST_SCHEMA_TYPE = z.infer<typeof OTHER_LIST_SCHEMA>;
