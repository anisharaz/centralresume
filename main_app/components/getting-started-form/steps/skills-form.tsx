"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ENGINEERING_RESUME_TYPE } from "@/lib/zod/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SkillsFormProps {
  form: UseFormReturn<ENGINEERING_RESUME_TYPE>;
}

export function SkillsForm({ form }: SkillsFormProps) {
  const [skillType, setSkillType] = useState<"soft" | "technical">("technical");
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [skillTags, setSkillTags] = useState("");
  const [currentSkillIndex, setCurrentSkillIndex] = useState<number | null>(
    null
  );

  const resetSkillForm = () => {
    setSkillName("");
    setSkillLevel("");
    setSkillTags("");
    setCurrentSkillIndex(null);
  };

  const addSkill = () => {
    if (!skillName) return;

    const newSkill = {
      name: skillName,
      level: skillLevel || undefined,
      tags: skillTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    const currentSkills = form.getValues(`skills.${skillType}`) || [];

    if (currentSkillIndex !== null) {
      // Update existing skill
      const updatedSkills = [...currentSkills];
      updatedSkills[currentSkillIndex] = newSkill;
      form.setValue(`skills.${skillType}`, updatedSkills);
    } else {
      // Add new skill
      form.setValue(`skills.${skillType}`, [...currentSkills, newSkill]);
    }

    resetSkillForm();
  };

  const editSkill = (type: "soft" | "technical", index: number) => {
    setSkillType(type);
    const skill = form.getValues(`skills.${type}`)?.[index];
    if (!skill) return;

    setSkillName(skill.name);
    setSkillLevel(skill.level || "");
    setSkillTags(skill.tags.join(", "));
    setCurrentSkillIndex(index);
  };

  const removeSkill = (type: "soft" | "technical", index: number) => {
    const currentSkills = form.getValues(`skills.${type}`) || [];
    form.setValue(
      `skills.${type}`,
      currentSkills.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Skills</h2>

      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">Add Skills</TabsTrigger>
          <TabsTrigger value="view">View Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="space-y-4 mt-4">
          <div className="space-y-4 border p-4 rounded-md">
            <div className="space-y-2">
              <label className="text-sm font-medium">Skill Type</label>
              <Select
                value={skillType}
                onValueChange={(value) =>
                  setSkillType(value as "soft" | "technical")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select skill type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Skill</SelectItem>
                  <SelectItem value="soft">Soft Skill</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Skill Name</label>
              <Input
                placeholder="e.g., JavaScript, Leadership"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Skill Level (Optional)
              </label>
              <Select value={skillLevel} onValueChange={setSkillLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <Input
                placeholder="Tags (comma separated)"
                value={skillTags}
                onChange={(e) => setSkillTags(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={addSkill}>
                {currentSkillIndex !== null ? "Update Skill" : "Add Skill"}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="view" className="space-y-6 mt-4">
          <div className="space-y-4">
            <h3 className="text-md font-medium">Technical Skills</h3>

            {(!form.watch("skills.technical") ||
              form.watch("skills.technical")?.length === 0) && (
              <p className="text-muted-foreground text-sm">
                No technical skills added yet.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.watch("skills.technical")?.map((skill, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{skill.name}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => editSkill("technical", index)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSkill("technical", index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {skill.level && (
                        <p className="text-sm">Level: {skill.level}</p>
                      )}

                      {skill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {skill.tags.map((tag, tagIndex) => (
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

          <div className="space-y-4">
            <h3 className="text-md font-medium">Soft Skills</h3>

            {(!form.watch("skills.soft") ||
              form.watch("skills.soft")?.length === 0) && (
              <p className="text-muted-foreground text-sm">
                No soft skills added yet.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.watch("skills.soft")?.map((skill, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{skill.name}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => editSkill("soft", index)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSkill("soft", index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {skill.level && (
                        <p className="text-sm">Level: {skill.level}</p>
                      )}

                      {skill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {skill.tags.map((tag, tagIndex) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
