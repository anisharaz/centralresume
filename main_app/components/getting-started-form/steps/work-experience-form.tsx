"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ENGINEERING_RESUME_TYPE } from "@/lib/zod/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface WorkExperienceFormProps {
  form: UseFormReturn<ENGINEERING_RESUME_TYPE>;
}

export function WorkExperienceForm({ form }: WorkExperienceFormProps) {
  const [workExperience, setWorkExperience] = useState({
    company: "",
    tags: "",
    position: "",
    positionTags: "",
    website: "",
    startDate: "",
    endDate: "",
    summaryText: "",
    summaryTags: "",
    highlightText: "",
    highlightTags: "",
  });

  const [currentWorkIndex, setCurrentWorkIndex] = useState<number | null>(null);
  const [highlightItems, setHighlightItems] = useState<string[]>([]);

  const resetWorkForm = () => {
    setWorkExperience({
      company: "",
      tags: "",
      position: "",
      positionTags: "",
      website: "",
      startDate: "",
      endDate: "",
      summaryText: "",
      summaryTags: "",
      highlightText: "",
      highlightTags: "",
    });
    setHighlightItems([]);
    setCurrentWorkIndex(null);
  };

  const addHighlightItem = () => {
    if (!workExperience.highlightText) return;
    setHighlightItems([...highlightItems, workExperience.highlightText]);
    setWorkExperience({ ...workExperience, highlightText: "" });
  };

  const removeHighlightItem = (index: number) => {
    setHighlightItems(highlightItems.filter((_, i) => i !== index));
  };

  const addWorkExperience = () => {
    if (
      !workExperience.company ||
      !workExperience.position ||
      !workExperience.startDate
    )
      return;

    const currentExperiences = form.getValues("work_experience") || [];

    const newExperience = {
      company: workExperience.company,
      tags: workExperience.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      position: [
        {
          text: workExperience.position,
          tags: workExperience.positionTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
      ],
      website: workExperience.website || undefined,
      start_date: new Date(workExperience.startDate),
      end_date: workExperience.endDate
        ? new Date(workExperience.endDate)
        : undefined,
      summary: [
        {
          text: workExperience.summaryText,
          tags: workExperience.summaryTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
      ],
      highlights: [
        {
          text: highlightItems,
          tags: workExperience.highlightTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
      ],
    };

    if (currentWorkIndex !== null) {
      // Update existing experience
      const updatedExperiences = [...currentExperiences];
      updatedExperiences[currentWorkIndex] = newExperience;
      form.setValue("work_experience", updatedExperiences);
    } else {
      // Add new experience
      form.setValue("work_experience", [...currentExperiences, newExperience]);
    }

    resetWorkForm();
  };

  const editWorkExperience = (index: number) => {
    const experience = form.getValues("work_experience")?.[index];
    if (!experience) return;

    setWorkExperience({
      company: experience.company,
      tags: experience.tags.join(", "),
      position: experience.position[0]?.text || "",
      positionTags: experience.position[0]?.tags.join(", ") || "",
      website: experience.website || "",
      startDate: experience.start_date.toISOString().split("T")[0],
      endDate: experience.end_date
        ? experience.end_date.toISOString().split("T")[0]
        : "",
      summaryText: experience.summary[0]?.text || "",
      summaryTags: experience.summary[0]?.tags.join(", ") || "",
      highlightText: "",
      highlightTags: experience.highlights[0]?.tags.join(", ") || "",
    });

    setHighlightItems(experience.highlights[0]?.text || []);
    setCurrentWorkIndex(index);
  };

  const removeWorkExperience = (index: number) => {
    const currentExperiences = form.getValues("work_experience") || [];
    form.setValue(
      "work_experience",
      currentExperiences.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Work Experience</h2>

      <div className="space-y-4 border p-4 rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <Input
              placeholder="Company name"
              value={workExperience.company}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  company: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <Input
              placeholder="Tags (comma separated)"
              value={workExperience.tags}
              onChange={(e) =>
                setWorkExperience({ ...workExperience, tags: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Position</label>
            <Input
              placeholder="Job title"
              value={workExperience.position}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  position: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Position Tags</label>
            <Input
              placeholder="Tags (comma separated)"
              value={workExperience.positionTags}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  positionTags: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Website (Optional)</label>
          <Input
            placeholder="https://company.com"
            value={workExperience.website}
            onChange={(e) =>
              setWorkExperience({ ...workExperience, website: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Input
              type="date"
              value={workExperience.startDate}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  startDate: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">End Date (Optional)</label>
            <Input
              type="date"
              value={workExperience.endDate}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  endDate: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Summary</label>
          <Textarea
            placeholder="Brief description of your role"
            value={workExperience.summaryText}
            onChange={(e) =>
              setWorkExperience({
                ...workExperience,
                summaryText: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Summary Tags</label>
          <Input
            placeholder="Tags (comma separated)"
            value={workExperience.summaryTags}
            onChange={(e) =>
              setWorkExperience({
                ...workExperience,
                summaryTags: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-medium">Highlights</h3>

          <div className="flex gap-2">
            <Input
              placeholder="Achievement or responsibility"
              value={workExperience.highlightText}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  highlightText: e.target.value,
                })
              }
            />
            <Button type="button" variant="outline" onClick={addHighlightItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="space-y-2">
            {highlightItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <p>{item}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHighlightItem(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Highlight Tags</label>
            <Input
              placeholder="Tags (comma separated)"
              value={workExperience.highlightTags}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  highlightTags: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={addWorkExperience}>
            {currentWorkIndex !== null ? "Update Experience" : "Add Experience"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-md font-medium">Added Work Experiences</h3>

        {form.watch("work_experience")?.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No work experiences added yet.
          </p>
        )}

        <div className="space-y-4">
          {form.watch("work_experience")?.map((experience, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{experience.company}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editWorkExperience(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeWorkExperience(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{experience.position[0]?.text}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(experience.start_date).toLocaleDateString()} -
                    {experience.end_date
                      ? new Date(experience.end_date).toLocaleDateString()
                      : "Present"}
                  </p>
                  <p>{experience.summary[0]?.text}</p>

                  {experience.highlights[0]?.text.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium">Highlights:</p>
                      <ul className="list-disc pl-5 mt-1">
                        {experience.highlights[0]?.text.map(
                          (highlight, hIndex) => (
                            <li key={hIndex}>{highlight}</li>
                          )
                        )}
                      </ul>
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
