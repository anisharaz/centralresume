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
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_TAG_NAME } from "@/lib/vars";
import cookies from "js-cookie";
import { TagManagement } from "./tag-management-form";
import { Separator } from "@/components/ui/separator";

function AchievementEditForm({
  title,
  description,
  dataWithTag,
  resumeTags,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["achievements"];
  resumeTags: string[];
}) {
  const router = useRouter();
  const currentTag = cookies.get("currentTag") || DEFAULT_TAG_NAME;
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

  const { fields, remove, prepend } = useFieldArray({
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
          onSubmit={handleSubmit(onSubmit, () => {
            toast.error("Required fields have red titles", {
              description: "fill in the required fields to proceed.",
              position: "top-center",
              duration: 5000,
            });
          })}
          className="relative h-full overflow-y-auto space-y-4 px-2"
        >
          <datalist id="tags">
            {resumeTags.map((item, index) => (
              <option value={item} key={index} />
            ))}
          </datalist>
          {/* Achievements Section */}
          <div className="p-2 space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold">Achievements</h3>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  prepend({
                    title: "",
                    tags: [{ tag: currentTag }],
                    date: new Date().toISOString().split("T")[0],
                    awarded_by: "",
                    summary: [{ text: "", tags: [{ tag: currentTag }] }],
                  })
                }
              >
                Add Achievement
              </Button>
            </div>
            <div className="space-y-4">
              {fields.map((item, index) => (
                <div key={item.id}>
                  <div className="relative">
                    <Separator className="my-2 border-4 rounded-xl border-foreground/50" />
                    <div className="absolute text-2xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                      {index + 1} / {fields.length}
                    </div>
                  </div>
                  <div className="border p-3 rounded space-y-2">
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

                    <TagManagement
                      control={control}
                      fieldName={`achievements.${index}.tags`}
                      resumeTags={resumeTags}
                      currentTag={currentTag}
                      tagLabel="Achievement Tags"
                    />

                    {/* Summary Section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-lg font-bold">
                          Summary
                        </FormLabel>
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
                              { text: "", tags: [{ tag: currentTag }] },
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
                                    <Textarea
                                      placeholder="Describe your achievement"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <TagManagement
                              control={control}
                              fieldName={`achievements.${index}.summary.${summaryIndex}.tags`}
                              resumeTags={resumeTags}
                              currentTag={currentTag}
                              onRemoveField={() => {
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
                              removeFieldLabel="Remove Summary"
                              tagLabel="Summary Tags"
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
                </div>
              ))}
            </div>
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
