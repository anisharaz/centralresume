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
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl flex gap-5">
            <div>Education</div>
            <div>{children}</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-2">
          {!data || data.length === 0 ? (
            <p className="text-muted-foreground text-sm pl-6">
              No education added yet.
            </p>
          ) : null}
          {data.map((education, index) => (
            <div
              key={index}
              className="border border-neutral-600 p-3 rounded-md relative"
            >
              <div className="space-y-4 pr-12">
                {/* Institution Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-2xl font-semibold">
                        {education.institution}
                      </h2>
                    </div>

                    <div className="ml-8 space-y-2">
                      {education.degree_level &&
                        education.degree_level.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {education.degree_level.map(
                              (degree, degreeIndex) => (
                                <Badge
                                  key={degreeIndex}
                                  variant="default"
                                  className="text-sm"
                                >
                                  {degree.text}
                                </Badge>
                              )
                            )}
                          </div>
                        )}

                      {education.field && education.field.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {education.field.map((field, fieldIndex) => (
                            <Badge
                              key={fieldIndex}
                              variant="secondary"
                              className="text-sm"
                            >
                              {field.text}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Duration and Score */}
                <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Duration
                          </p>
                          <div className="font-medium">
                            <p>
                              {formatDate(education.startDate)} -{" "}
                              {formatDate(education.endDate)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {calculateDuration(
                                education.startDate,
                                education.endDate
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {education.score && (
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Grade
                            </p>
                            <p className="font-medium">{education.score}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
