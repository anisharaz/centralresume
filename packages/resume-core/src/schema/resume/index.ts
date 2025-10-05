import { z } from "zod";
import { WORK_EXPERIENCE_SCHEMA } from "./work-experience";
import { SKILLS_SCHEMA } from "./skills";
import { EDUCATION_SCHEMA } from "./education";
import { ACHIEVEMENT_SCHEMA } from "./achievement";
import { OTHER_LIST_SCHEMA } from "./other-list";
import { PERSONAL_DETAILS_SCHEMA } from "./personal-detail";
import { PUBLICATION_SCHEMA } from "./publication";
import { PROJECTS_SCHEMA } from "./projects";
export { WORK_EXPERIENCE_SCHEMA } from "./work-experience";
export { SKILLS_SCHEMA } from "./skills";
export { EDUCATION_SCHEMA } from "./education";
export { ACHIEVEMENT_SCHEMA } from "./achievement";
export { OTHER_LIST_SCHEMA } from "./other-list";
export { PERSONAL_DETAILS_SCHEMA } from "./personal-detail";
export { PUBLICATION_SCHEMA } from "./publication";
export { PROJECTS_SCHEMA } from "./projects";

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

export type RESUME_SCHEMA_TYPE = z.infer<typeof RESUME_ZOD_SCHEMA>;
