"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ENGINEERING_RESUME_TYPE } from "@/lib/zod/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface AchievementsFormProps {
  form: UseFormReturn<ENGINEERING_RESUME_TYPE>;
}

export function AchievementsForm({ form }: AchievementsFormProps) {
  const [achievement, setAchievement] = useState({
    title: "",
    tags: "",
    date: "",
    awardedBy: "",
    summaryText: "",
    summaryTags: "",
  });

  const [currentAchievementIndex, setCurrentAchievementIndex] = useState<
    number | null
  >(null);

  const resetAchievementForm = () => {
    setAchievement({
      title: "",
      tags: "",
      date: "",
      awardedBy: "",
      summaryText: "",
      summaryTags: "",
    });
    setCurrentAchievementIndex(null);
  };

  const addAchievement = () => {
    if (!achievement.title || !achievement.date) return;

    const newAchievement = {
      title: achievement.title,
      tags: achievement.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      date: new Date(achievement.date),
      awarded_by: achievement.awardedBy || undefined,
      summary: achievement.summaryText
        ? [
            {
              text: achievement.summaryText,
              tags: achievement.summaryTags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            },
          ]
        : undefined,
    };

    const currentAchievements = form.getValues("achievements") || [];

    if (currentAchievementIndex !== null) {
      // Update existing achievement
      const updatedAchievements = [...currentAchievements];
      updatedAchievements[currentAchievementIndex] = newAchievement;
      form.setValue("achievements", updatedAchievements);
    } else {
      // Add new achievement
      form.setValue("achievements", [...currentAchievements, newAchievement]);
    }

    resetAchievementForm();
  };

  const editAchievement = (index: number) => {
    const achievementData = form.getValues("achievements")?.[index];
    if (!achievementData) return;

    setAchievement({
      title: achievementData.title,
      tags: achievementData.tags.join(", "),
      date: achievementData.date.toISOString().split("T")[0],
      awardedBy: achievementData.awarded_by || "",
      summaryText: achievementData.summary?.[0]?.text || "",
      summaryTags: achievementData.summary?.[0]?.tags.join(", ") || "",
    });

    setCurrentAchievementIndex(index);
  };

  const removeAchievement = (index: number) => {
    const currentAchievements = form.getValues("achievements") || [];
    form.setValue(
      "achievements",
      currentAchievements.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Achievements</h2>

      <div className="space-y-4 border p-4 rounded-md">
        <div className="space-y-2">
          <label className="text-sm font-medium">Achievement Title</label>
          <Input
            placeholder="e.g., Best Developer Award"
            value={achievement.title}
            onChange={(e) =>
              setAchievement({ ...achievement, title: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>
          <Input
            placeholder="Tags (comma separated)"
            value={achievement.tags}
            onChange={(e) =>
              setAchievement({ ...achievement, tags: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <Input
            type="date"
            value={achievement.date}
            onChange={(e) =>
              setAchievement({ ...achievement, date: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Awarded By (Optional)</label>
          <Input
            placeholder="e.g., Google, Microsoft"
            value={achievement.awardedBy}
            onChange={(e) =>
              setAchievement({ ...achievement, awardedBy: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Summary (Optional)</label>
          <Textarea
            placeholder="Brief description of the achievement"
            value={achievement.summaryText}
            onChange={(e) =>
              setAchievement({ ...achievement, summaryText: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Summary Tags</label>
          <Input
            placeholder="Tags (comma separated)"
            value={achievement.summaryTags}
            onChange={(e) =>
              setAchievement({ ...achievement, summaryTags: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={addAchievement}>
            {currentAchievementIndex !== null
              ? "Update Achievement"
              : "Add Achievement"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-md font-medium">Added Achievements</h3>

        {(!form.watch("achievements") ||
          form.watch("achievements")?.length === 0) && (
          <p className="text-muted-foreground text-sm">
            No achievements added yet.
          </p>
        )}

        <div className="space-y-4">
          {form.watch("achievements")?.map((achievement, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{achievement.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editAchievement(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {new Date(achievement.date).toLocaleDateString()}
                    {achievement.awarded_by &&
                      ` • Awarded by ${achievement.awarded_by}`}
                  </p>

                  {achievement.summary && achievement.summary[0]?.text && (
                    <p>{achievement.summary[0].text}</p>
                  )}

                  {achievement.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {achievement.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-muted text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
