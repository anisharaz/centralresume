import React from "react";
import { ResumeDataType } from "@/lib/types";
import { DUMMY_MODE } from "@/lib/vars";
import PublicationsEditForm from "./edit-forms/publications-edit-form";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { PublicationsSectionView } from "./components/publication-section-view";
import { PUBLICATIONS_DUMMY_DATA } from "@/lib/dummy-data";

type Publications = ResumeDataType["publications"];

export function PublicationsCard({
  data,
  dataWithTag,
  resumeTags,
}: {
  data: Publications;
  dataWithTag: RESUME_TYPE["publications"];
  resumeTags: string[];
}) {
  if (DUMMY_MODE) {
    data = PUBLICATIONS_DUMMY_DATA;
  }

  return (
    <PublicationsSectionView data={data}>
      <PublicationsEditForm
        dataWithTag={dataWithTag}
        title="Publications"
        description="Manage your publications here."
        resumeTags={resumeTags}
      />
    </PublicationsSectionView>
  );
}
