import React from "react";
import { ResumeDataType } from "@/lib/types";
import { DUMMY_MODE } from "@/lib/vars";
import WorkExperienceEditForm from "./edit-forms/work-experience-edit-form";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { WORK_EXPERIENCE_DUMMY_DATA } from "@/lib/dummy-data";
import { WorkExperienceSectionView } from "./components/work-experience-section-view";

type WorkExperience = ResumeDataType["work_experience"];

export function WorkExperienceCard({
  data,
  dataWithTag,
  resumeTags,
}: {
  data: WorkExperience;
  dataWithTag: RESUME_TYPE["work_experience"];
  resumeTags: string[];
}) {
  if (DUMMY_MODE) {
    data = WORK_EXPERIENCE_DUMMY_DATA;
  }

  return (
    <WorkExperienceSectionView data={data}>
      <WorkExperienceEditForm
        title="Add Work Experience"
        description="Add a new work experience entry"
        dataWithTag={dataWithTag}
        resumeTags={resumeTags}
      />
    </WorkExperienceSectionView>
  );
}
