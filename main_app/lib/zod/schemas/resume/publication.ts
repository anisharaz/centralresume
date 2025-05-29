import { z } from "zod";
import { TAGS } from "./index";

export const PUBLICATION_SCHEMA = z
  .array(
    z.object({
      name: z.string(),
      tags: TAGS,
      publisher: z.string(),
      releaseDate: z.date(),
      url: z.string(),
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

export type PUBLICATION_SCHEMA_TYPE = z.infer<typeof PUBLICATION_SCHEMA>;
