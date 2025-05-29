import React from "react";
import { ResumeDataType } from "@/lib/types";
import { DUMMY_MODE } from "@/lib/vars";
import OthersListEditForm from "./edit-forms/others-list-edit-form";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { OtherListsSectionView } from "./components/others-list-section-view";
import { OTHER_LISTS_DUMMY_DATA } from "@/lib/dummy-data";

type OtherLists = ResumeDataType["otherLists"];

export function OtherListsCard({
  data,
  dataWithTag,
}: {
  data: OtherLists;
  dataWithTag: RESUME_TYPE["otherLists"];
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
      />
    </OtherListsSectionView>
  );
}
