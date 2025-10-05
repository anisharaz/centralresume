import { ResumeDataType } from "@centralresume/resume-core/types";
import { DUMMY_MODE } from "@/lib/vars";
import SkillsEditForm from "./edit-forms/skills-edit-form";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";
import { SKILLS_DUMMY_DATA } from "@/lib/dummy-data";
import { SkillsSectionView } from "./components/skills-section-view";

type Skills = ResumeDataType["skills"];

export function SkillsCard({
  data,
  dataWithTag,
  resumeTags,
}: {
  data: Skills;
  dataWithTag: RESUME_SCHEMA_TYPE["skills"];
  resumeTags: string[];
}) {
  if (DUMMY_MODE) {
    data = SKILLS_DUMMY_DATA;
  }

  return (
    <SkillsSectionView data={data}>
      <SkillsEditForm
        title="Edit Skills"
        description="Edit your skills and expertise levels"
        dataWithTag={dataWithTag}
        resumeTags={resumeTags}
      />
    </SkillsSectionView>
  );
}
