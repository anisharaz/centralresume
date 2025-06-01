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
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACHIEVEMENT_SCHEMA } from "@/lib/zod/schemas/resume/achievement";
import { z } from "zod";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { updateResume } from "@/app/actions/resume/update-resume";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function AchievementEditForm({
  title,
  description,
  dataWithTag,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["achievements"];
}) {
  const router = useRouter();
  const FormSchema = z.object({
    achievements: ACHIEVEMENT_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  const getDefaultValues = (): FormValues => {
    return {
      achievements: dataWithTag,
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(),
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Updated achievements data:", data);
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
                name={`achievements.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Achievement Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Achievement title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`achievements.${index}.awarded_by`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Awarded By</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Organization or institution"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`achievements.${index}.date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
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

              {/* Achievement Tags */}
              <FormField
                control={control}
                name={`achievements.${index}.tags`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Achievement Tags</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {field.value?.map((tag, tagIndex) => (
                          <div key={tagIndex} className="flex gap-2">
                            <Input
                              value={tag}
                              onChange={(e) => {
                                const newTags = [...(field.value || [])];
                                newTags[tagIndex] = e.target.value;
                                field.onChange(newTags);
                              }}
                              placeholder={`Tag ${tagIndex + 1}`}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newTags =
                                  field.value?.filter(
                                    (_, i) => i !== tagIndex
                                  ) || [];
                                field.onChange(newTags);
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
                          onClick={() =>
                            field.onChange([...(field.value || []), ""])
                          }
                        >
                          Add Tag
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary */}
              <div>
                <FormLabel>Summary</FormLabel>
                <div className="space-y-4 mt-2">
                  {form
                    .watch(`achievements.${index}.summary`)
                    ?.map((_, summaryIndex) => (
                      <div
                        key={summaryIndex}
                        className="border p-3 rounded space-y-2"
                      >
                        <FormField
                          control={control}
                          name={`achievements.${index}.summary.${summaryIndex}.text`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Summary Text</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Describe your achievement"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`achievements.${index}.summary.${summaryIndex}.tags`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Summary Tags</FormLabel>
                              <FormControl>
                                <div className="space-y-2">
                                  {field.value?.map((tag, tagIndex) => (
                                    <div key={tagIndex} className="flex gap-2">
                                      <Input
                                        value={tag}
                                        onChange={(e) => {
                                          const newTags = [
                                            ...(field.value || []),
                                          ];
                                          newTags[tagIndex] = e.target.value;
                                          field.onChange(newTags);
                                        }}
                                        placeholder={`Tag ${tagIndex + 1}`}
                                      />
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const newTags =
                                            field.value?.filter(
                                              (_, i) => i !== tagIndex
                                            ) || [];
                                          field.onChange(newTags);
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
                                    onClick={() =>
                                      field.onChange([
                                        ...(field.value || []),
                                        "",
                                      ])
                                    }
                                  >
                                    Add Summary Tag
                                  </Button>
                                </div>
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
                            const currentSummary = form.getValues(
                              `achievements.${index}.summary`
                            );
                            const newSummary = currentSummary.filter(
                              (_, i) => i !== summaryIndex
                            );
                            form.setValue(
                              `achievements.${index}.summary`,
                              newSummary
                            );
                          }}
                        >
                          Remove Summary
                        </Button>
                      </div>
                    ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentSummary = form.getValues(
                        `achievements.${index}.summary`
                      );
                      form.setValue(`achievements.${index}.summary`, [
                        ...currentSummary,
                        { text: "", tags: [] },
                      ]);
                    }}
                  >
                    Add Summary
                  </Button>
                </div>
              </div>

              <Button
                variant="destructive"
                type="button"
                onClick={() => remove(index)}
              >
                Remove Achievement
              </Button>
            </div>
          ))}
          <div className="flex gap-4">
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
                  date: new Date().toISOString().split("T")[0],
                  awarded_by: "",
                  summary: [{ text: "", tags: [] }],
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

export default AchievementEditForm;
