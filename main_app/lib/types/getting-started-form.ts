import { z } from "zod";
import { formSchema } from "../zod/schemas";
export type FormValues = z.infer<typeof formSchema>;
