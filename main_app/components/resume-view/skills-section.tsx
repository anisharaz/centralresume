import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Code, Star } from "lucide-react";
import { ResumeDataType } from "@/lib/types";

type Skills = ResumeDataType["skills"];

export function SkillsCard({ data }: { data: Skills }) {
  // TODO: remove dummy data
  data = {
    soft: [
      { name: "Communication", level: "advanced" },
      { name: "Leadership", level: "intermediate" },
      { name: "Problem Solving", level: "advanced" },
      { name: "Team Collaboration", level: "advanced" },
      { name: "Time Management", level: "intermediate" },
      { name: "Adaptability", level: "advanced" },
    ],
    technical: [
      { name: "JavaScript", level: "advanced" },
      { name: "TypeScript", level: "advanced" },
      { name: "React", level: "advanced" },
      { name: "Node.js", level: "intermediate" },
      { name: "Python", level: "intermediate" },
      { name: "Docker", level: "beginner" },
      { name: "AWS", level: "intermediate" },
      { name: "PostgreSQL", level: "intermediate" },
      { name: "MongoDB", level: "beginner" },
      { name: "Git", level: "advanced" },
    ],
  };

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
    const iconClass = "h-3 w-3";
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

  if (!data || (!data.soft && !data.technical)) {
    return (
      <div className="w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              No skills added yet.
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
          <CardTitle className="text-4xl">Skills</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-2">
          {data.soft && data.soft.length > 0 && (
            <div className="space-y-4 border border-neutral-600 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Soft Skills</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.soft.map((skill, index) => (
                  <Card key={index} className="p-3">
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm">{skill.name}</h3>
                      {skill.level && (
                        <div className="flex items-center gap-2">
                          {getLevelIcon(skill.level)}
                          <Badge
                            variant={getLevelColor(skill.level)}
                            className="text-xs"
                          >
                            {skill.level}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {data.technical && data.technical.length > 0 && (
            <div className="space-y-4 border border-neutral-600 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Technical Skills</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.technical.map((skill, index) => (
                  <Card key={index} className="p-3 ">
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm">{skill.name}</h3>
                      {skill.level && (
                        <div className="flex items-center gap-2">
                          {getLevelIcon(skill.level)}
                          <Badge
                            variant={getLevelColor(skill.level)}
                            className="text-xs"
                          >
                            {skill.level}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
