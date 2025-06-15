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
import { Separator } from "@/components/ui/separator";

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
    mode: "all",
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative h-full overflow-y-scroll space-y-4 px-2"
        >
          {/* Achievements Section */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Achievements</h3>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  append({
                    title: "",
                    tags: ["#common"],
                    date: new Date().toISOString().split("T")[0],
                    awarded_by: "",
                    summary: [{ text: "", tags: ["#common"] }],
                  })
                }
              >
                Add Achievement
              </Button>
            </div>

            {fields.map((item, index) => (
              <div key={item.id} className="border p-3 rounded space-y-2">
                <FormField
                  control={control}
                  name={`achievements.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Achievement Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Achievement title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`achievements.${index}.awarded_by`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-bold">
                          Awarded By
                        </FormLabel>
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
                        <FormLabel className="text-lg font-bold">
                          Date
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
                  name={`achievements.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Achievement Tags
                      </FormLabel>
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
                                disabled={field.value?.length <= 1}
                              >
                                Remove tag
                              </Button>
                            </div>
                          ))}
                          <Separator className="my-4" />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              field.onChange([
                                ...(field.value || []),
                                "#common",
                              ])
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

                {/* Summary Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-lg font-bold">Summary</FormLabel>
                    <Button
                      type="button"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => {
                        const currentSummary = form.getValues(
                          `achievements.${index}.summary`
                        );
                        form.setValue(`achievements.${index}.summary`, [
                          ...currentSummary,
                          { text: "", tags: ["#common"] },
                        ]);
                      }}
                    >
                      Add Summary
                    </Button>
                  </div>

                  {form
                    .watch(`achievements.${index}.summary`)
                    ?.map((_, summaryIndex) => (
                      <div
                        key={summaryIndex}
                        className="border p-2 rounded space-y-2"
                      >
                        <FormField
                          control={control}
                          name={`achievements.${index}.summary.${summaryIndex}.text`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-bold">
                                Summary Text
                              </FormLabel>
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
                              <FormLabel className="text-lg font-bold">
                                Summary Tags
                              </FormLabel>
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
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          const newTags =
                                            field.value?.filter(
                                              (_, i) => i !== tagIndex
                                            ) || [];
                                          field.onChange(newTags);
                                        }}
                                        disabled={field.value?.length <= 1}
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
                                      onClick={() => {
                                        const currentSummary = form.getValues(
                                          `achievements.${index}.summary`
                                        );
                                        const newSummary =
                                          currentSummary.filter(
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
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        field.onChange([
                                          ...(field.value || []),
                                          "#common",
                                        ])
                                      }
                                    >
                                      Add Summary Tag
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

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove Achievement
                </Button>
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

export default AchievementEditForm;
