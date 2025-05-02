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

interface ExperienceFormProps {
  form: UseFormReturn<FormValues>;
}

export function ExperienceForm({ form }: ExperienceFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-4 rounded border border-slate-200 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Experience #{index + 1}</h3>
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
            name={`experience.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Senior Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`experience.${index}.company`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`experience.${index}.location`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco, CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name={`experience.${index}.startDate`}
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
              name={`experience.${index}.endDate`}
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
            name={`experience.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements"
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
        Add Experience
      </Button>
    </div>
  );
}
