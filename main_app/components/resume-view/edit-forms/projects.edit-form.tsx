"use client";
import BaseSheetComponentForEdit from "./base-sheet-component-for-edit";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PROJECTS_SCHEMA } from "@/lib/zod/schemas/resume/projects";
import { z } from "zod";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { updateResume } from "@/app/actions/resume/update-resume";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function ProjectsEditForm({
  title,
  description,
  dataWithTag,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["projects"];
}) {
  const router = useRouter();
  const FormSchema = z.object({
    projects: PROJECTS_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  const getDefaultValues = (): FormValues => {
    return {
      projects: dataWithTag,
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(),
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Updated projects data:", data);
    const res = await updateResume({
      newResumeData: data,
    });
    if (res.success) {
      toast.success("Resume updated successfully");
      router.refresh();
    } else {
      alert("Failed to update resume");
    }
  };

  const formatDateForInput = (dateString: string | undefined): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  return (
    <BaseSheetComponentForEdit title={title} description={description}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg shadow-sm space-y-4"
            >
              <FormField
                control={control}
                name={`projects.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`projects.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={formatDateForInput(field.value)}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`projects.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={formatDateForInput(field.value)}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name={`projects.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/user/project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`projects.${index}.summary`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the project, technologies used, and key achievements..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags Section */}
              <div>
                <FormLabel>Tags</FormLabel>
                <div className="space-y-2 mt-2">
                  {form.watch(`projects.${index}.tags`)?.map((_, tagIndex) => (
                    <div key={tagIndex} className="flex gap-2 items-center">
                      <FormField
                        control={control}
                        name={`projects.${index}.tags.${tagIndex}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Enter tag" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const currentTags = form.getValues(
                            `projects.${index}.tags`
                          );
                          const newTags = currentTags.filter(
                            (_, i) => i !== tagIndex
                          );
                          form.setValue(`projects.${index}.tags`, newTags);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentTags = form.getValues(
                        `projects.${index}.tags`
                      );
                      form.setValue(`projects.${index}.tags`, [
                        ...currentTags,
                        "",
                      ]);
                    }}
                  >
                    Add Tag
                  </Button>
                </div>
              </div>

              <Button
                variant="destructive"
                type="button"
                onClick={() => remove(index)}
              >
                Remove Project
              </Button>
            </div>
          ))}
          <div className="flex gap-5">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
              Submit
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  title: "",
                  tags: [],
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: undefined,
                  summary: "",
                  url: "",
                })
              }
            >
              Add New
            </Button>
          </div>
        </form>
      </Form>
    </BaseSheetComponentForEdit>
  );
}

export default ProjectsEditForm;
