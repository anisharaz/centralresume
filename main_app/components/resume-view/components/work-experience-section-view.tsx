import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDataType } from "@/lib/types";
import Link from "next/link";
import { calculateDuration } from "@/lib/utils";

type WorkExperience = ResumeDataType["work_experience"];

export function WorkExperienceSectionView({
  data,
  children,
}: {
  data: WorkExperience;
  children?: React.ReactNode;
}) {
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

  return (
    <div className="w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl flex gap-5">
            <div>Work experience</div>
            <div>{children}</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-2">
          {!data || data.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No work experience added yet.
            </p>
          ) : null}
          {data.map((experience, index) => (
            <div
              key={index}
              className="border border-neutral-600 rounded-md p-2 relative"
            >
              <div className="space-y-4">
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
