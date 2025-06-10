import { z } from "zod";

export const TAGS = z.array(z.string()).min(1, "At least one tag is required");
