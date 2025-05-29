import { z } from "zod";

export const TAGS = z.array(z.string());