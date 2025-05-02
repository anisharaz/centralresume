"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { PlusCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { FormValues } from "@/lib/types/getting-started-form";

interface SkillsFormProps {
  form: UseFormReturn<FormValues>;
}

export function SkillsForm({ form }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      append(newSkill.trim());
      setNewSkill("");
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="skills"
        render={() => (
          <FormItem>
            <FormLabel>Skills</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., JavaScript, Project Management)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddSkill}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {fields.map((field, index) => (
                    <Badge
                      key={field.id}
                      variant="secondary"
                      className="px-3 py-1.5 text-sm"
                    >
                      {field.value}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-2"
                        onClick={() => remove(index)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </Badge>
                  ))}
                  {fields.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      No skills added yet. Add some skills to showcase your
                      expertise.
                    </div>
                  )}
                </div>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
