"use client";

import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormValues } from "@/lib/types/getting-started-form";

interface EducationFormProps {
  form: UseFormReturn<FormValues>;
}

export function EducationForm({ form }: EducationFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-4 rounded border border-slate-200 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Education #{index + 1}</h3>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          <FormField
            control={form.control}
            name={`education.${index}.school`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>School/University</FormLabel>
                <FormControl>
                  <Input placeholder="Harvard University" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name={`education.${index}.degree`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input placeholder="Bachelor of Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`education.${index}.fieldOfStudy`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field of Study</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name={`education.${index}.startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`education.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name={`education.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your studies, achievements, etc."
                    className="min-h-[100px]"
                    value={field.value || ""}
                    onChange={field.onChange}
                    name={field.name}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append({})}
        className="w-full"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
