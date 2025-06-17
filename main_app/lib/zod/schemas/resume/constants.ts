import { z } from "zod";

export const TAGS = z
  .array(z.string())
  .min(1, "At least one tag is required")
  .max(10, "No more than 10 tags allowed");
