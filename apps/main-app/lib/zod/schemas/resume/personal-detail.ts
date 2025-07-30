import { z } from "zod";
import { TAGS } from "./constants";

export const PERSONAL_DETAILS_SCHEMA = z.object({
  name: z.string().min(1, "Full name is required"),
  tag_line: z
    .array(
      z.object({
        text: z.string().min(1, "Tag line is required"),
        tags: TAGS,
      })
    )
    .min(1, { message: "At least one tag line is required" }),
  summary: z.array(
    z.object({
      text: z.string().min(1, "Summary is required"),
      tags: TAGS,
    })
  ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  phone: z.string().optional(),
  date_of_birth: z.string().optional(),
  address: z.object({
    address_line: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
  }),
  social_links: z.array(
    z.object({
      name: z.string().min(1, "Social link name is required"),
      url: z.string().url("Please enter a valid URL"),
      tags: TAGS,
    })
  ),
});

export type PERSONAL_DETAILS_SCHEMA_TYPE = z.infer<
  typeof PERSONAL_DETAILS_SCHEMA
>;
