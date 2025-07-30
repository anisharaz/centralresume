import React from "react";
import { ResumeDataType } from "@/lib/types";
import { DUMMY_MODE } from "@/lib/vars";
import ProjectsEditForm from "./edit-forms/projects.edit-form";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { PROJECTS_DUMMY_DATA } from "@/lib/dummy-data";
import { ProjectsSectionView } from "./components/projects-section-view";

type Projects = ResumeDataType["projects"];

export function ProjectsCard({
  data,
  dataWithTag,
  resumeTags,
}: {
  data: Projects;
  dataWithTag: RESUME_TYPE["projects"];
  resumeTags: string[];
}) {
  if (DUMMY_MODE) {
    data = PROJECTS_DUMMY_DATA;
  }

  return (
    <ProjectsSectionView data={data}>
      <ProjectsEditForm
        title="Add Project"
        description="Add a new project to showcase your work."
        dataWithTag={dataWithTag}
        resumeTags={resumeTags}
      />
    </ProjectsSectionView>
  );
}
