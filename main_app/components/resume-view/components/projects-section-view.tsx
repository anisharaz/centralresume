import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ExternalLink, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDataType } from "@/lib/types";
import Link from "next/link";
import { calculateDuration, formatDate } from "@/lib/utils";

type Projects = ResumeDataType["projects"];

export function ProjectsSectionView({
  data,
  children,
}: {
  data: Projects;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl flex gap-5">
            <div>Projects</div>
            <div>{children}</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-2">
          {!data || data.length === 0 ? (
            <p className="text-muted-foreground text-sm pl-6">
              No projects added yet.
            </p>
          ) : null}
          {data.map((project, index) => (
            <div
              key={index}
              className="border border-neutral-600 rounded-md p-2 relative"
            >
              <div className="space-y-4">
                {/* Project Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-2xl font-semibold">
                        {project.title}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-2 lg:text-right">
                    {project.url && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm">View Project</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Date and Duration */}
                {(project.startDate || project.endDate) && (
                  <div className="ml-8 space-y-2 w-fit">
                    <Card>
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Duration
                            </p>
                            <div className="font-medium">
                              <p>
                                {project.startDate
                                  ? formatDate(project.startDate)
                                  : "N/A"}{" "}
                                -{" "}
                                {project.endDate
                                  ? formatDate(project.endDate)
                                  : "Present"}
                              </p>
                              {project.startDate && (
                                <p className="text-sm text-muted-foreground">
                                  {calculateDuration(
                                    project.startDate,
                                    project.endDate
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Project Description */}
                {project.summary && (
                  <div className="ml-8 space-y-3">
                    <h3 className="text-lg font-medium">Project Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
