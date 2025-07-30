import { z } from "zod";
import { TAGS } from "./constants";
import {
  WORK_EXPERIENCE_SCHEMA,
  WORK_EXPERIENCE_SCHEMA_TYPE,
} from "./work-experience";
import { SKILLS_SCHEMA, SKILLS_SCHEMA_TYPE } from "./skills";
import { EDUCATION_SCHEMA, EDUCATION_SCHEMA_TYPE } from "./education";
import { ACHIEVEMENT_SCHEMA, ACHIEVEMENT_SCHEMA_TYPE } from "./achievement";
import { OTHER_LIST_SCHEMA, OTHER_LIST_SCHEMA_TYPE } from "./other-list";
import {
  PERSONAL_DETAILS_SCHEMA,
  PERSONAL_DETAILS_SCHEMA_TYPE,
} from "./personal-detail";
import { PUBLICATION_SCHEMA, PUBLICATION_SCHEMA_TYPE } from "./publication";
import { PROJECTS_SCHEMA, PROJECTS_SCHEMA_TYPE } from "./projects";
// Re-export TAGS for convenience
export { TAGS };

export const RESUME_ZOD_SCHEMA = z
  .object({
    version: z.string(),
    personal_details: PERSONAL_DETAILS_SCHEMA,
    work_experience: WORK_EXPERIENCE_SCHEMA,
    skills: SKILLS_SCHEMA,
    projects: PROJECTS_SCHEMA,
    education: EDUCATION_SCHEMA,
    achievements: ACHIEVEMENT_SCHEMA,
    otherLists: OTHER_LIST_SCHEMA,
    publications: PUBLICATION_SCHEMA,
  })
  .strict();

export { type PERSONAL_DETAILS_SCHEMA_TYPE };
export { type WORK_EXPERIENCE_SCHEMA_TYPE };
export { type SKILLS_SCHEMA_TYPE };
export { type EDUCATION_SCHEMA_TYPE };
export { type ACHIEVEMENT_SCHEMA_TYPE };
export { type OTHER_LIST_SCHEMA_TYPE };
export { type PUBLICATION_SCHEMA_TYPE };
export { type PROJECTS_SCHEMA_TYPE };
