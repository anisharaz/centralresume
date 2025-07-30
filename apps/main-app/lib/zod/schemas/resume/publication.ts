import { z } from "zod";
import { TAGS } from "./constants";

export const PUBLICATION_SCHEMA = z.array(
  z.object({
    name: z.string().min(1, "Name is required"),
    tags: TAGS,
    publisher: z.string().min(1, "Publisher is required"),
    releaseDate: z.string().min(1, "Release date is required"),
    url: z.string().optional(),
    summary: z.array(
      z.object({
        text: z.string(),
        tags: TAGS,
      })
    ),
  })
);

export type PUBLICATION_SCHEMA_TYPE = z.infer<typeof PUBLICATION_SCHEMA>;
