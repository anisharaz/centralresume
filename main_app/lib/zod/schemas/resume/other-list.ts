import { z } from "zod";
import { TAGS } from "./index";

export const OTHER_LIST_SCHEMA = z
  .array(
    z.object({
      tags: TAGS,
      heading: z.array(
        z.object({
          text: z.string(),
          tags: TAGS,
        })
      ),
      summary: z.array(
        z.object({
          text: z.string(),
          tags: TAGS,
        })
      ),
    })
  )
  .optional();

export type OTHER_LIST_SCHEMA_TYPE = z.infer<typeof OTHER_LIST_SCHEMA>;