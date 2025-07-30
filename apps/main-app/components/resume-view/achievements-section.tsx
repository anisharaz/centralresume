import React from "react";
import { ResumeDataType } from "@/lib/types";
import { DUMMY_MODE } from "@/lib/vars";
import AchievementEditForm from "./edit-forms/achievement-edit-form";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { AchievementsSectionView } from "./components/achievement-section-view";
import { ACHIEVEMENTS_DUMMY_DATA } from "@/lib/dummy-data";

type Achievements = ResumeDataType["achievements"];

export function AchievementsCard({
  data,
  dataWithTag,
  resumeTags,
}: {
  data: Achievements;
  dataWithTag: RESUME_TYPE["achievements"];
  resumeTags: string[];
}) {
  if (DUMMY_MODE) {
    data = ACHIEVEMENTS_DUMMY_DATA;
  }

  return (
    <AchievementsSectionView data={data}>
      <AchievementEditForm
        title="Add Achievement"
        description="Add a new achievement to showcase your accomplishments."
        dataWithTag={dataWithTag}
        resumeTags={resumeTags}
      />
    </AchievementsSectionView>
  );
}
