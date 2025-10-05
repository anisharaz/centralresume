export { type PERSONAL_DETAILS_SCHEMA_TYPE } from "../schema/resume/personal-detail";
export { type WORK_EXPERIENCE_SCHEMA_TYPE } from "../schema/resume/work-experience";
export { type SKILLS_SCHEMA_TYPE } from "../schema/resume/skills";
export { type EDUCATION_SCHEMA_TYPE } from "../schema/resume/education";
export { type ACHIEVEMENT_SCHEMA_TYPE } from "../schema/resume/achievement";
export { type OTHER_LIST_SCHEMA_TYPE } from "../schema/resume/other-list";
export { type PUBLICATION_SCHEMA_TYPE } from "../schema/resume/publication";
export { type PROJECTS_SCHEMA_TYPE } from "../schema/resume/projects";
export { type RESUME_SCHEMA_TYPE } from "../schema/resume";
export { type TAGS_TYPE } from "../schema/resume/constants";

export type ResumeDataType = {
  personal_details: {
    name: string;
    tag_line: {
      text: string;
    }[];
    summary: {
      text: string;
    }[];
    email: string;
    phone?: string;
    date_of_birth?: string;
    address?: {
      address_line: string;
      city: string;
      country: string;
    };
    social_links: {
      name: string;
      url: string;
    }[];
  };
  work_experience: {
    company: string;
    position: {
      text: string;
    }[];
    website?: string;
    start_date: Date;
    end_date?: Date;
    summary: {
      text: string;
    }[];
    highlights: {
      text: string[];
    }[];
  }[];
  skills: {
    soft: {
      name: string;
      level?: string; // eg. "beginner", "intermediate", "advanced"
    }[];
    technical: {
      name: string;
      level?: string;
    }[];
  };
  projects: {
    title: string;
    startDate?: Date;
    endDate?: Date;
    summary: string;
    url?: string;
  }[];
  achievements: {
    title: string;
    date: Date;
    awarded_by?: string; // eg. "Google", "Microsoft", Dev.to
    summary: {
      text: string;
    }[];
  }[];
  education: {
    institution: string;
    field: {
      // eg. "Computer Science", "Software Engineering"
      text: string;
    }[];
    degree_level: {
      // eg. "Bachelor", "Master", "PhD"
      text: string;
    }[];
    startDate: Date;
    endDate: Date;
    score: string; // eg. "3.5/4.0", "80%"
  }[];
  publications: {
    //eg "Research Papers", "Books", "Articles"
    name: string;
    publisher: string;
    releaseDate: Date;
    url: string;
    summary: {
      text: string;
    }[];
  }[];
  otherLists: {
    heading: {
      text: string;
    }[];
    summary: {
      text: string;
    }[];
  }[];
};
