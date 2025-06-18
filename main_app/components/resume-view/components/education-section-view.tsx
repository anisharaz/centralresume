import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { ResumeDataType } from "@/lib/types";
import { formatDate, calculateDuration } from "@/lib/utils";

type Education = ResumeDataType["education"];

export function EducationSectionView({
  data,
  children,
}: {
  data: Education;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto">
      <Card className="border-0 shadow-md bg-gradient-to-br from-background to-muted/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-3xl lg:text-4xl font-bold tracking-tight flex  lg:items-center gap-3">
            <span>Education</span>
            <div className="flex items-center">{children}</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {!data || data.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No education added yet.
            </p>
          ) : null}
          {data.map((education, index) => (
            <div
              key={index}
              className="border border-muted/40 bg-background/40 backdrop-blur-sm rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Institution Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                        <GraduationCap className="h-3 w-3 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold">
                        {education.institution}
                      </h2>
                    </div>

                    <div className="ml-8 space-y-2">
                      {education.degree_level &&
                        education.degree_level.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {education.degree_level.map(
                              (degree, degreeIndex) => (
                                <Badge
                                  key={degreeIndex}
                                  variant="default"
                                  className="px-2 py-0.5 text-xs font-medium"
                                >
                                  {degree.text}
                                </Badge>
                              )
                            )}
                          </div>
                        )}

                      {education.field && education.field.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {education.field.map((field, fieldIndex) => (
                            <Badge
                              key={fieldIndex}
                              variant="secondary"
                              className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                              {field.text}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Duration and Score - Inline compact */}
                <div className="ml-8 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background/60 border border-muted/40 rounded-lg">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                      <Calendar className="h-2.5 w-2.5 text-primary" />
                    </div>
                    <div className="text-xs">
                      <span className="font-medium">
                        {formatDate(education.startDate)} -{" "}
                        {formatDate(education.endDate)}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        (
                        {calculateDuration(
                          education.startDate,
                          education.endDate
                        )}
                        )
                      </span>
                    </div>
                  </div>

                  {education.score && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background/60 border border-muted/40 rounded-lg">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                        <Award className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Grade:</span>
                        <span className="font-medium ml-1">
                          {education.score}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
