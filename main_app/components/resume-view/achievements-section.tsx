import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Building } from "lucide-react";
import { ResumeDataType } from "@/lib/types";
import { DUMMY_MODE } from "@/lib/vars";
import AchievementEditForm from "./edit-forms/achievement-edit-form";

type Achievements = ResumeDataType["achievements"];

export function AchievementsCard({ data }: { data: Achievements }) {
  if (DUMMY_MODE) {
    data = [
      {
        title: "Best Innovation Award 2023",
        date: new Date("2023-12-15"),
        awarded_by: "TechCorp Inc.",
        summary: [
          {
            text: "Recognized for developing an AI-powered automation tool that reduced manual processing time by 75%.",
          },
          {
            text: "Led a cross-functional team of 8 members to deliver the project ahead of schedule.",
          },
        ],
      },
      {
        title: "Employee of the Year",
        date: new Date("2022-11-20"),
        awarded_by: "Innovatech Solutions",
        summary: [
          {
            text: "Awarded for exceptional performance and leadership in driving team productivity.",
          },
          {
            text: "Mentored 5 junior developers and improved overall team code quality by 40%.",
          },
        ],
      },
      {
        title: "Hackathon Winner - FinTech Challenge",
        date: new Date("2022-06-10"),
        awarded_by: "Dev Community",
        summary: [
          {
            text: "First place winner among 200+ participants for building a blockchain-based payment solution.",
          },
          {
            text: "Completed the entire application in 48 hours with real-time transaction processing.",
          },
        ],
      },
      {
        title: "AWS Certified Solutions Architect",
        date: new Date("2021-09-05"),
        awarded_by: "Amazon Web Services",
        summary: [
          {
            text: "Professional certification demonstrating expertise in designing distributed systems on AWS.",
          },
        ],
      },
      {
        title: "Open Source Contributor Recognition",
        date: new Date("2021-03-22"),
        awarded_by: "GitHub",
        summary: [
          {
            text: "Recognized for significant contributions to popular open-source projects with over 500 commits.",
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

  if (!data || data.length === 0) {
    return (
      <div className="w-full mx-auto">
        <Card>
          <CardHeader>
             <CardTitle className="text-4xl flex gap-5">
              <div>Achievements</div>
              <div>
                <AchievementEditForm />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              No achievements added yet.
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
            <div>Achievements</div>
            <div>
              <AchievementEditForm />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-2">
          {data.map((achievement, index) => (
            <div
              key={index}
              className=" border border-neutral-600 p-3 rounded-md"
            >
              <div className="space-y-4">
                {/* Achievement Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <h2 className="text-2xl font-semibold">
                        {achievement.title}
                      </h2>
                    </div>

                    {achievement.awarded_by && (
                      <div className="flex items-center gap-2 ml-7">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="secondary" className="text-sm">
                          {achievement.awarded_by}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date */}
                <div className="ml-7 space-y-2">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Achievement Date
                          </p>
                          <p className="font-medium">
                            {formatDate(achievement.date)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary */}
                {achievement.summary && achievement.summary.length > 0 && (
                  <div className="ml-7 space-y-3">
                    <h3 className="text-lg font-medium">Details</h3>
                    <div className="space-y-2">
                      {achievement.summary.map((item, summaryIndex) => (
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
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
