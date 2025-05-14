import { z } from "zod";

export const createOauthClientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  redirectUri: z.string().url("Please enter a valid URL"),
  icon: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional(),
});
export const TAGS = z.array(z.string());
export const ENGINEERING_RESUME = z.object({
  version: z.string(),
  personal_details: z.object({
    name: z.string(),
    tag_line: z
      .array(
        z.object({
          text: z.string(),
          tags: TAGS,
        })
      )
      .optional(),
    summary: z
      .array(
        z.object({
          text: z.string(),
          tags: TAGS,
        })
      )
      .optional(),
    email: z.string(),
    phone: z.string().optional(),
    date_of_birth: z.string().optional(),
    address: z
      .object({
        address_line: z.string(),
        city: z.string(),
        country: z.string(),
      })
      .optional(),
    social_links: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
          tags: TAGS,
        })
      )
      .optional(),
  }),
  work_experience: z
    .array(
      z.object({
        company: z.string(),
        tags: TAGS,
        position: z.array(
          z.object({
            text: z.string(),
            tags: TAGS,
          })
        ),
        website: z.string().optional(),
        start_date: z.date(),
        end_date: z.date().optional(),
        summary: z.array(
          z.object({
            text: z.string(),
            tags: TAGS,
          })
        ),
        highlights: z.array(
          z.object({
            text: z.array(z.string()),
            tags: TAGS,
          })
        ),
      })
    )
    .optional(),
  skills: z
    .object({
      soft: z
        .array(
          z.object({
            name: z.string(),
            level: z.string().optional(),
            tags: z.array(z.string()),
          })
        )
        .optional(),
      technical: z
        .array(
          z.object({
            name: z.string(),
            level: z.string().optional(),
            tags: z.array(z.string()),
          })
        )
        .optional(),
    })
    .optional(),
  achievements: z
    .array(
      z.object({
        title: z.string(),
        tags: z.array(z.string()),
        date: z.date(),
        awarded_by: z.string().optional(),
        summary: z
          .array(
            z.object({
              text: z.string(),
              tags: z.array(z.string()),
            })
          )
          .optional(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        institution: z.string(),
        tags: z.array(z.string()),
        field: z.array(
          z.object({
            text: z.string(),
            tags: z.array(z.string()),
          })
        ),
        degree_level: z.array(
          z.object({
            text: z.string(),
            tags: z.array(z.string()),
          })
        ),
        startDate: z.date(),
        endDate: z.date(),
        score: z.string(),
      })
    )
    .optional(),
  publications: z
    .array(
      z.object({
        name: z.string(),
        tags: z.array(z.string()),
        publisher: z.string(),
        releaseDate: z.date(),
        url: z.string(),
        summary: z
          .array(
            z.object({
              text: z.string(),
              tags: z.array(z.string()),
            })
          )
          .optional(),
      })
    )
    .optional(),
  otherLists: z
    .array(
      z.object({
        tags: z.array(z.string()),
        heading: z.array(
          z.object({
            text: z.string(),
            tags: z.array(z.string()),
          })
        ),
        summary: z.array(
          z.object({
            text: z.string(),
            tags: z.array(z.string()),
          })
        ),
      })
    )
    .optional(),
});

export type ENGINEERING_RESUME_TYPE = z.infer<typeof ENGINEERING_RESUME>;
