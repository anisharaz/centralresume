import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { ResumeDataType } from "@/lib/types";
import { DUMMY_MODE } from "@/lib/vars";

type Education = ResumeDataType["education"];

export function EducationCard({ data }: { data: Education }) {
  if (DUMMY_MODE) {
    data = [
      {
        institution: "Stanford University",
        field: [{ text: "Computer Science" }, { text: "Software Engineering" }],
        degree_level: [{ text: "Master of Science" }],
        startDate: new Date("2018-09-01"),
        endDate: new Date("2020-06-15"),
        score: "3.8/4.0",
      },
      {
        institution: "University of California, Berkeley",
        field: [{ text: "Computer Science" }],
        degree_level: [{ text: "Bachelor of Science" }],
        startDate: new Date("2014-08-25"),
        endDate: new Date("2018-05-20"),
        score: "3.6/4.0",
      },
      {
        institution: "Community College of San Francisco",
        field: [{ text: "General Studies" }],
        degree_level: [{ text: "Associate Degree" }],
        startDate: new Date("2012-09-01"),
        endDate: new Date("2014-06-10"),
        score: "3.9/4.0",
      },
    ];
  }

  const formatDate = (dateString: Date) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } catch {
      return dateString.toString();
    }
  };

  const calculateDuration = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

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
            <CardTitle className="text-4xl">Education</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              No education added yet.
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
          <CardTitle className="text-4xl">Education</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-2">
          {data.map((education, index) => (
            <div
              key={index}
              className="border border-neutral-600 p-3 rounded-md"
            >
              <div className="space-y-4">
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
