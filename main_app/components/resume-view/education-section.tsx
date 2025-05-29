import React from "react";
import { ResumeDataType } from "@/lib/types";
import { DUMMY_MODE } from "@/lib/vars";
import EducationEditForm from "./edit-forms/education-edit-form";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { EducationSectionView } from "./components/education-section-view";
import { EDUCATION_DUMMY_DATA } from "@/lib/dummy-data";

type Education = ResumeDataType["education"];

export function EducationCard({
  data,
  dataWithTag,
}: {
  data: Education;
  dataWithTag: RESUME_TYPE["education"];
}) {
  if (DUMMY_MODE) {
    data = EDUCATION_DUMMY_DATA;
  }

  return (
    <EducationSectionView data={data}>
      <EducationEditForm
        dataWithTag={dataWithTag}
        title="Education Details"
        description="Provide details about your education."
      />
    </EducationSectionView>
  );
}
