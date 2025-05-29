import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDataType } from "@/lib/types";
import Link from "next/link";
import { DUMMY_MODE } from "@/lib/vars";
import WorkExperienceEditForm from "./edit-forms/work-experience-edit-form";
import { RESUME_TYPE } from "@/lib/zod/schemas";

type WorkExperience = ResumeDataType["work_experience"];

export function WorkExperienceCard({
  data,
  dataWithTag,
}: {
  data: WorkExperience;
  dataWithTag: RESUME_TYPE["work_experience"];
}) {
  if (DUMMY_MODE) {
    // TODO: separate dummy data to new file
    data = [
      {
        company: "TechCorp Inc.",
        position: [{ text: "Software Engineer" }, { text: "Team Lead" }],
        website: "https://techcorp.com",
        start_date: new Date("2020-01-15"),
        end_date: new Date("2023-05-28"),
        summary: [
          {
            text: "Developed scalable web applications using React and Node.js.",
          },
          {
            text: "Led a team of 5 engineers to deliver high-quality software solutions.",
          },
        ],
        highlights: [
          {
            text: [
              "Implemented CI/CD pipelines to improve deployment efficiency.",
              "Optimized database queries, reducing response time by 30%.",
            ],
          },
        ],
      },
      {
        company: "Innovatech Solutions",
        position: [{ text: "Junior Developer" }],
        website: "https://innovatech.com",
        start_date: new Date("2018-06-01"),
        end_date: new Date("2019-12-31"),
        summary: [
          {
            text: "Assisted in the development of internal tools and dashboards.",
          },
          {
            text: "Collaborated with cross-functional teams to gather requirements.",
          },
        ],
        highlights: [
          {
            text: [
              "Contributed to open-source projects, enhancing company visibility.",
              "Automated repetitive tasks, saving 10+ hours weekly.",
            ],
          },
        ],
      },
    ];
  }

  const formatDate = (dateString: Date) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString.toString();
    }
  };

  const calculateDuration = (startDate: Date, endDate?: Date) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0 && months > 0) {
      return `${years} yr${years > 1 ? "s" : ""} ${months} mo${
        months > 1 ? "s" : ""
      }`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? "s" : ""}`;
    } else if (months > 0) {
      return `${months} mo${months > 1 ? "s" : ""}`;
    } else {
      return "Less than 1 month";
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl flex gap-5">
              <div>Work experience</div>
              <div>
                <WorkExperienceEditForm
                  title="Add Work Experience"
                  description="Add your first work experience entry"
                  isEdit={false}
                  dataWithTag={dataWithTag}
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              No work experience added yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl flex gap-5">
            <div>Work experience</div>
            <div>
              <WorkExperienceEditForm
                title="Add Work Experience"
                description="Add a new work experience entry"
                isEdit={false}
                dataWithTag={dataWithTag}
              />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-2">
          {data.map((experience, index) => (
            <div
              key={index}
              className="border border-neutral-600 rounded-md p-2 relative"
            >
              {/* Edit button for this specific experience */}
              <div className="absolute top-4 right-4">
                <WorkExperienceEditForm
                  title={`Edit ${experience.company}`}
                  description={`Edit details for ${experience.company}`}
                  isEdit={true}
                  dataWithTag={dataWithTag}
                />
              </div>

              <div className="space-y-4 pr-12">
                {/* Company Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-2xl font-semibold">
                        {experience.company}
                      </h2>
                    </div>

                    {experience.position && experience.position.length > 0 && (
                      <div className="flex flex-wrap gap-2 ml-8">
                        {experience.position.map((pos, posIndex) => (
                          <Badge
                            key={posIndex}
                            variant="secondary"
                            className="text-sm"
                          >
                            {pos.text}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 lg:text-right">
                    {experience.website && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={experience.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm">Company Website</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Date and Duration */}
                <div className="ml-8 space-y-2 w-fit">
                  <Card>
                    <CardContent className="pt-4 ">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Duration
                          </p>
                          <div className="font-medium">
                            <p>
                              {formatDate(experience.start_date)} -{" "}
                              {experience.end_date
                                ? formatDate(experience.end_date)
                                : "Present"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {calculateDuration(
                                experience.start_date,
                                experience.end_date
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary */}
                {experience.summary && experience.summary.length > 0 && (
                  <div className="ml-8 space-y-3">
                    <h3 className="text-lg font-medium">Role Summary</h3>
                    <div className="space-y-2">
                      {experience.summary.map((item, summaryIndex) => (
                        <p
                          key={summaryIndex}
                          className="text-muted-foreground leading-relaxed"
                        >
                          {item.text}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Achievements */}
                {experience.highlights && experience.highlights.length > 0 && (
                  <div className="ml-8 space-y-3">
                    <h3 className="text-lg font-medium">Key Achievements</h3>
                    <div className="space-y-2">
                      {experience.highlights.map(
                        (highlight, highlightIndex) => (
                          <ul
                            key={highlightIndex}
                            className="list-disc pl-5 space-y-1"
                          >
                            {highlight.text.map((text, textIndex) => (
                              <li
                                key={textIndex}
                                className="text-muted-foreground leading-relaxed"
                              >
                                {text}
                              </li>
                            ))}
                          </ul>
                        )
                      )}
                    </div>
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
