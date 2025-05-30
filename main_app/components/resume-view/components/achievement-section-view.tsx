import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Building } from "lucide-react";
import { ResumeDataType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Achievements = ResumeDataType["achievements"];

export function AchievementsSectionView({
  data,
  children,
}: {
  data: Achievements;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl flex gap-5">
            <div>Achievements</div>
            <div>{children}</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-2">
          {!data || data.length === 0 ? (
            <p className="text-muted-foreground text-sm pl-6">
              No achievements added yet.
            </p>
          ) : null}
          {data.map((achievement, index) => (
            <div
              key={index}
              className=" border border-neutral-600 p-3 rounded-md relative"
            >
              <div className="space-y-4 pr-12">
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
