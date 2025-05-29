import React from "react";
import { ResumeDataType } from "@/lib/types";
import { DUMMY_MODE } from "@/lib/vars";
import PersonalDetailEditForm from "./edit-forms/personal-detail-edit-form";
import { RESUME_TYPE } from "@/lib/zod/schemas/";
import ProfileDetailSectionView from "./components/profile-detail--section-view";
import { PROFILE_DETAIL_DUMMY_DATA } from "@/lib/dummy-data";
type PersonalDetails = ResumeDataType["personal_details"];

export function PersonalDetailsCard({
  data,
  dataWithTag,
}: {
  data: PersonalDetails;
  dataWithTag: RESUME_TYPE["personal_details"];
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
      />
    </ProfileDetailSectionView>
  );
}
