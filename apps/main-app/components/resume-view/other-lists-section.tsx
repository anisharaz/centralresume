import React from "react";
import { ResumeDataType } from "@centralresume/resume-core/types";
import { DUMMY_MODE } from "@/lib/vars";
import OthersListEditForm from "./edit-forms/others-list-edit-form";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";
import { OtherListsSectionView } from "./components/others-list-section-view";
import { OTHER_LISTS_DUMMY_DATA } from "@/lib/dummy-data";

type OtherLists = ResumeDataType["otherLists"];

export function OtherListsCard({
  data,
  dataWithTag,
  resumeTags,
}: {
  data: OtherLists;
  dataWithTag: RESUME_SCHEMA_TYPE["otherLists"];
  resumeTags: string[];
}) {
  if (DUMMY_MODE) {
    data = OTHER_LISTS_DUMMY_DATA;
  }

  return (
    <OtherListsSectionView data={data}>
      <OthersListEditForm
        dataWithTag={dataWithTag}
        title="Additional Information"
        description="Provide a brief overview of your Additional info here."
        resumeTags={resumeTags}
      />
    </OtherListsSectionView>
  );
}
