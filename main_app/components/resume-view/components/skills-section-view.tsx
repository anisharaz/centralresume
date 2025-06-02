import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Star } from "lucide-react";
import { ResumeDataType } from "@/lib/types";

type Skills = ResumeDataType["skills"];

export function SkillsSectionView({
  data,
  children,
}: {
  data: Skills;
  children?: React.ReactNode;
}) {
  const getLevelColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case "advanced":
        return "default";
      case "intermediate":
        return "secondary";
      case "beginner":
        return "outline";
      default:
        return "outline";
    }
  };

  const getLevelIcon = (level?: string) => {
    const iconClass = "h-2.5 w-2.5";
    switch (level?.toLowerCase()) {
      case "advanced":
        return <Star className={`${iconClass} fill-current`} />;
      case "intermediate":
        return <Star className={`${iconClass} fill-current opacity-60`} />;
      case "beginner":
        return <Star className={`${iconClass}`} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto">
      <Card className="border-0 shadow-md bg-gradient-to-br from-background to-muted/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-3xl lg:text-4xl font-bold tracking-tight flex flex-col lg:flex-row lg:items-center gap-3">
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Skills
            </span>
            <div className="flex items-center">{children}</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {!data || (data.soft.length == 0 && data.technical.length == 0) ? (
            <p className="text-muted-foreground text-sm">
              No skills added yet.
            </p>
          ) : null}

          {data.soft && data.soft.length > 0 && (
            <div className="border border-muted/40 bg-background/40 backdrop-blur-sm rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                    <Brain className="h-3 w-3 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Soft Skills</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {data.soft.map((skill, index) => (
                    <div
                      key={index}
                      className="border border-muted/40 bg-background/60 rounded-lg p-2.5"
                    >
                      <div className="space-y-1.5">
                        <h3 className="font-medium text-sm">{skill.name}</h3>
                        {skill.level && (
                          <div className="flex items-center gap-1.5">
                            {getLevelIcon(skill.level)}
                            <Badge
                              variant={getLevelColor(skill.level)}
                              className="px-1.5 py-0.5 text-xs"
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {data.technical && data.technical.length > 0 && (
            <div className="border border-muted/40 bg-background/40 backdrop-blur-sm rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                    <Code className="h-3 w-3 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Technical Skills</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {data.technical.map((skill, index) => (
                    <div
                      key={index}
                      className="border border-muted/40 bg-background/60 rounded-lg p-2.5"
                    >
                      <div className="space-y-1.5">
                        <h3 className="font-medium text-sm">{skill.name}</h3>
                        {skill.level && (
                          <div className="flex items-center gap-1.5">
                            {getLevelIcon(skill.level)}
                            <Badge
                              variant={getLevelColor(skill.level)}
                              className="px-1.5 py-0.5 text-xs"
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
