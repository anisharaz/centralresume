"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ENGINEERING_RESUME_TYPE } from "@/lib/zod/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EducationFormProps {
  form: UseFormReturn<ENGINEERING_RESUME_TYPE>;
}

export function EducationForm({ form }: EducationFormProps) {
  const [education, setEducation] = useState({
    institution: "",
    tags: "",
    field: "",
    fieldTags: "",
    degreeLevel: "",
    degreeLevelTags: "",
    startDate: "",
    endDate: "",
    score: "",
  });

  const [currentEducationIndex, setCurrentEducationIndex] = useState<
    number | null
  >(null);

  const resetEducationForm = () => {
    setEducation({
      institution: "",
      tags: "",
      field: "",
      fieldTags: "",
      degreeLevel: "",
      degreeLevelTags: "",
      startDate: "",
      endDate: "",
      score: "",
    });
    setCurrentEducationIndex(null);
  };

  const addEducation = () => {
    if (
      !education.institution ||
      !education.field ||
      !education.degreeLevel ||
      !education.startDate ||
      !education.endDate
    )
      return;

    const newEducation = {
      institution: education.institution,
      tags: education.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      field: [
        {
          text: education.field,
          tags: education.fieldTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
      ],
      degree_level: [
        {
          text: education.degreeLevel,
          tags: education.degreeLevelTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
      ],
      startDate: new Date(education.startDate),
      endDate: new Date(education.endDate),
      score: education.score,
    };

    const currentEducations = form.getValues("education") || [];

    if (currentEducationIndex !== null) {
      // Update existing education
      const updatedEducations = [...currentEducations];
      updatedEducations[currentEducationIndex] = newEducation;
      form.setValue("education", updatedEducations);
    } else {
      // Add new education
      form.setValue("education", [...currentEducations, newEducation]);
    }

    resetEducationForm();
  };

  const editEducation = (index: number) => {
    const educationData = form.getValues("education")?.[index];
    if (!educationData) return;

    setEducation({
      institution: educationData.institution,
      tags: educationData.tags.join(", "),
      field: educationData.field[0]?.text || "",
      fieldTags: educationData.field[0]?.tags.join(", ") || "",
      degreeLevel: educationData.degree_level[0]?.text || "",
      degreeLevelTags: educationData.degree_level[0]?.tags.join(", ") || "",
      startDate: educationData.startDate.toISOString().split("T")[0],
      endDate: educationData.endDate.toISOString().split("T")[0],
      score: educationData.score,
    });

    setCurrentEducationIndex(index);
  };

  const removeEducation = (index: number) => {
    const currentEducations = form.getValues("education") || [];
    form.setValue(
      "education",
      currentEducations.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Education</h2>

      <div className="space-y-4 border p-4 rounded-md">
        <div className="space-y-2">
          <label className="text-sm font-medium">Institution</label>
          <Input
            placeholder="e.g., Stanford University"
            value={education.institution}
            onChange={(e) =>
              setEducation({ ...education, institution: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>
          <Input
            placeholder="Tags (comma separated)"
            value={education.tags}
            onChange={(e) =>
              setEducation({ ...education, tags: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Field of Study</label>
            <Input
              placeholder="e.g., Computer Science"
              value={education.field}
              onChange={(e) =>
                setEducation({ ...education, field: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Field Tags</label>
            <Input
              placeholder="Tags (comma separated)"
              value={education.fieldTags}
              onChange={(e) =>
                setEducation({ ...education, fieldTags: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Degree Level</label>
            <Input
              placeholder="e.g., Bachelor's, Master's"
              value={education.degreeLevel}
              onChange={(e) =>
                setEducation({ ...education, degreeLevel: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Degree Level Tags</label>
            <Input
              placeholder="Tags (comma separated)"
              value={education.degreeLevelTags}
              onChange={(e) =>
                setEducation({ ...education, degreeLevelTags: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Input
              type="date"
              value={education.startDate}
              onChange={(e) =>
                setEducation({ ...education, startDate: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Input
              type="date"
              value={education.endDate}
              onChange={(e) =>
                setEducation({ ...education, endDate: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Score/GPA</label>
          <Input
            placeholder="e.g., 3.8/4.0, First Class"
            value={education.score}
            onChange={(e) =>
              setEducation({ ...education, score: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={addEducation}>
            {currentEducationIndex !== null
              ? "Update Education"
              : "Add Education"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-md font-medium">Added Education</h3>

        {(!form.watch("education") ||
          form.watch("education")?.length === 0) && (
          <p className="text-muted-foreground text-sm">
            No education entries added yet.
          </p>
        )}

        <div className="space-y-4">
          {form.watch("education")?.map((education, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{education.institution}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editEducation(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {education.degree_level[0]?.text} in{" "}
                    {education.field[0]?.text}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(education.startDate).toLocaleDateString()} -
                    {new Date(education.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm">Score: {education.score}</p>

                  {education.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {education.tags.map((tag, tagIndex) => (
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
