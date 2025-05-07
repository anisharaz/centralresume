import { z } from "zod";

export const formSchema = z.object({
  // Personal Details
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  location: z.string().optional(),
  headline: z.string().optional(),
  about: z.string().optional(),

  // Education
  education: z
    .array(
      z.object({
        school: z.string().optional(),
        degree: z.string().optional(),
        fieldOfStudy: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional()
    .default([]),

  // Experience
  experience: z
    .array(
      z.object({
        title: z.string().optional(),
        company: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional()
    .default([]),

  // Skills
  skills: z.array(z.string()).optional().default([]),
});

export const createOauthClientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  redirectUri: z.string().url("Please enter a valid URL"),
  icon: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional(),
});
