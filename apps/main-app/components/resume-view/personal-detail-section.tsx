import React from "react";
import { ResumeDataType } from "@centralresume/resume-core/types";
import { DUMMY_MODE } from "@/lib/vars";
import PersonalDetailEditForm from "./edit-forms/personal-detail-edit-form";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";
import { ProfileDetailSectionView } from "./components/profile-detail-section-view";
import { PROFILE_DETAIL_DUMMY_DATA } from "@/lib/dummy-data";
type PersonalDetails = ResumeDataType["personal_details"];

export function PersonalDetailsCard({
  data,
  dataWithTag,
  resumeTags,
}: {
  data: PersonalDetails;
  dataWithTag: RESUME_SCHEMA_TYPE["personal_details"];
  resumeTags: string[];
}) {
  if (DUMMY_MODE) {
    data = PROFILE_DETAIL_DUMMY_DATA;
  }
  return (
    <ProfileDetailSectionView data={data}>
      <PersonalDetailEditForm
        dataWithTag={dataWithTag}
        title="Edit Personal Details"
        description="Edit your personal details and save the changes"
        resumeTags={resumeTags}
      />
    </ProfileDetailSectionView>
  );
}
