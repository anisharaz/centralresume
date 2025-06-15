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
import { Separator } from "@/components/ui/separator";
import { DEFAULT_TAG_NAME } from "@/lib/vars";

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
    mode: "all",
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative h-full overflow-y-scroll space-y-4 px-2"
        >
          {/* Projects Section */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Projects</h3>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  append({
                    title: "",
                    tags:
                      fields.length > 0
                        ? ["#for_job1"]
                        : [DEFAULT_TAG_NAME, "#for_job1"],
                    startDate: new Date().toISOString().split("T")[0],
                    endDate: undefined,
                    summary: "",
                    url: "",
                  })
                }
              >
                Add Project
              </Button>
            </div>

            {fields.map((item, index) => (
              <div key={item.id} className="border p-3 rounded space-y-2">
                <FormField
                  control={control}
                  name={`projects.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Project Title
                      </FormLabel>
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
                        <FormLabel className="text-lg font-bold">
                          Start Date
                        </FormLabel>
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
                        <FormLabel className="text-lg font-bold">
                          End Date (Optional)
                        </FormLabel>
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
                      <FormLabel className="text-lg font-bold">
                        Project URL (Optional)
                      </FormLabel>
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
                      <FormLabel className="text-lg font-bold">
                        Project Description
                      </FormLabel>
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

                <FormField
                  control={control}
                  name={`projects.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Tags</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {field.value?.map((tag, tagIndex) => (
                            <div
                              key={tagIndex}
                              className="flex gap-2 flex-row-reverse items-center"
                            >
                              <Input
                                value={tag}
                                onChange={(e) => {
                                  const newTags = [...(field.value || [])];
                                  newTags[tagIndex] = e.target.value;
                                  field.onChange(newTags);
                                }}
                                placeholder={`Tag ${tagIndex + 1}`}
                                disabled={tag.startsWith(DEFAULT_TAG_NAME)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  const newTags =
                                    field.value?.filter(
                                      (_, i) => i !== tagIndex
                                    ) || [];
                                  field.onChange(newTags);
                                }}
                                disabled={
                                  field.value?.length <= 1 ||
                                  tag.startsWith(DEFAULT_TAG_NAME)
                                }
                              >
                                Remove tag
                              </Button>
                            </div>
                          ))}
                          <Separator className="my-4" />
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => remove(index)}
                              disabled={
                                fields.length <= 1 ||
                                (field.value.filter((tag) =>
                                  tag.startsWith(DEFAULT_TAG_NAME)
                                ).length >= 1 &&
                                  field.value.length <= 1)
                              }
                            >
                              Remove Project
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                field.onChange([
                                  ...(field.value || []),
                                  "#for_job1",
                                ])
                              }
                            >
                              Add Tag
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-background p-4 border-t">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </BaseSheetComponentForEdit>
  );
}

export default ProjectsEditForm;
