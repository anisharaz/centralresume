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
import { WORK_EXPERIENCE_SCHEMA } from "@/lib/zod/schemas/resume/work-experience";
import { z } from "zod";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { updateResume } from "@/app/actions/resume/update-resume";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

function WorkExperienceEditForm({
  title,
  description,
  dataWithTag,
  resumeTags,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["work_experience"];
  resumeTags: string[];
}) {
  const router = useRouter();
  const FormSchema = z.object({
    work_experience: WORK_EXPERIENCE_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  const getDefaultValues = (): FormValues => {
    // Keep dates as strings since schema now expects strings
    return {
      work_experience: dataWithTag,
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
    name: "work_experience",
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Updated work experience data:", data);
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
              duration: 5000,
              position: "top-center",
            });
          })}
          className="relative h-full overflow-y-scroll space-y-4 px-2"
        >
          <datalist id="tags">
            {resumeTags.map((item, index) => (
              <option value={item} key={index} />
            ))}
          </datalist>
          {/* Work Experience Section */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() => {
                  prepend({
                    company: "",
                    tags: ["#common"],
                    website: "",
                    start_date: new Date().toISOString().split("T")[0],
                    end_date: undefined,
                    position: [{ text: "", tags: ["#common"] }],
                    summary: [],
                    highlights: [],
                  });
                  toast.success("Added new work experience", {
                    position: "top-center",
                  });
                }}
              >
                Add Experience
              </Button>
            </div>

            {fields.map((item, index) => (
              <div key={item.id} className="border p-3 rounded space-y-2">
                <FormField
                  control={control}
                  name={`work_experience.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Company
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`work_experience.${index}.website`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`work_experience.${index}.start_date`}
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
                    name={`work_experience.${index}.end_date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            value={formatDateForInput(field.value)}
                            onChange={(e) =>
                              field.onChange(e.target.value || undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Company Tags */}
                <FormField
                  control={control}
                  name={`work_experience.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Tags</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {field.value?.map((tag, tagIndex) => (
                            <FormField
                              key={tagIndex}
                              control={control}
                              name={`work_experience.${index}.tags.${tagIndex}`}
                              render={({ field: tagField }) => (
                                <FormItem>
                                  <div className="flex gap-2 flex-row-reverse items-center">
                                    <FormControl>
                                      <Input
                                        {...tagField}
                                        placeholder={`Tag ${tagIndex + 1}`}
                                        list="tags"
                                      />
                                    </FormControl>
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
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ))}
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

                {/* Positions */}
                <div>
                  <FormLabel className="text-lg font-bold">Positions</FormLabel>
                  <div className="space-y-4 mt-2">
                    {form
                      .watch(`work_experience.${index}.position`)
                      ?.map((_, posIndex) => (
                        <div
                          key={posIndex}
                          className="border p-3 rounded space-y-2"
                        >
                          <FormField
                            control={control}
                            name={`work_experience.${index}.position.${posIndex}.text`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Position Title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., Senior Software Engineer"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={control}
                            name={`work_experience.${index}.position.${posIndex}.tags`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Position Tags</FormLabel>
                                <FormControl>
                                  <div className="space-y-2">
                                    {field.value?.map((tag, tagIndex) => (
                                      <FormField
                                        key={tagIndex}
                                        control={control}
                                        name={`work_experience.${index}.position.${posIndex}.tags.${tagIndex}`}
                                        render={({ field: tagField }) => (
                                          <FormItem>
                                            <div className="flex gap-2 flex-row-reverse items-center">
                                              <FormControl>
                                                <Input
                                                  {...tagField}
                                                  placeholder={`Tag ${
                                                    tagIndex + 1
                                                  }`}
                                                  list="tags"
                                                />
                                              </FormControl>
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
                                                  field.value?.length <= 1
                                                }
                                              >
                                                Remove tag
                                              </Button>
                                            </div>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    ))}
                                    <Separator className="my-4" />
                                    <div className="flex gap-2">
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          const currentPositions =
                                            form.getValues(
                                              `work_experience.${index}.position`
                                            );
                                          const newPositions =
                                            currentPositions.filter(
                                              (_, i) => i !== posIndex
                                            );
                                          form.setValue(
                                            `work_experience.${index}.position`,
                                            newPositions
                                          );
                                        }}
                                        disabled={
                                          form.watch(
                                            `work_experience.${index}.position`
                                          )?.length <= 1
                                        }
                                      >
                                        Remove Position
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
                                        Add Position Tag
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
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const currentPositions = form.getValues(
                          `work_experience.${index}.position`
                        );
                        form.setValue(`work_experience.${index}.position`, [
                          ...currentPositions,
                          { text: "", tags: ["#common"] },
                        ]);
                      }}
                    >
                      Add Position
                    </Button>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <FormLabel className="text-lg font-bold">Summary</FormLabel>
                  <div className="space-y-4 mt-2">
                    {form
                      .watch(`work_experience.${index}.summary`)
                      ?.map((_, summaryIndex) => (
                        <div
                          key={summaryIndex}
                          className="border p-3 rounded space-y-2"
                        >
                          <FormField
                            control={control}
                            name={`work_experience.${index}.summary.${summaryIndex}.text`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Summary Text</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe your role and responsibilities"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={control}
                            name={`work_experience.${index}.summary.${summaryIndex}.tags`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Summary Tags</FormLabel>
                                <FormControl>
                                  <div className="space-y-2">
                                    {field.value?.map((tag, tagIndex) => (
                                      <FormField
                                        key={tagIndex}
                                        control={control}
                                        name={`work_experience.${index}.summary.${summaryIndex}.tags.${tagIndex}`}
                                        render={({ field: tagField }) => (
                                          <FormItem>
                                            <div className="flex gap-2 flex-row-reverse items-center">
                                              <FormControl>
                                                <Input
                                                  {...tagField}
                                                  placeholder={`Tag ${
                                                    tagIndex + 1
                                                  }`}
                                                  list="tags"
                                                />
                                              </FormControl>
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
                                                  field.value?.length <= 1
                                                }
                                              >
                                                Remove tag
                                              </Button>
                                            </div>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    ))}
                                    <Separator className="my-4" />
                                    <div className="flex gap-2">
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          const currentSummary = form.getValues(
                                            `work_experience.${index}.summary`
                                          );
                                          const newSummary =
                                            currentSummary.filter(
                                              (_, i) => i !== summaryIndex
                                            );
                                          form.setValue(
                                            `work_experience.${index}.summary`,
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
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const currentSummary = form.getValues(
                          `work_experience.${index}.summary`
                        );
                        form.setValue(`work_experience.${index}.summary`, [
                          ...currentSummary,
                          { text: "", tags: ["#common"] },
                        ]);
                      }}
                    >
                      Add Summary
                    </Button>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <FormLabel className="text-lg font-bold">
                    Highlights
                  </FormLabel>
                  <div className="space-y-4 mt-2">
                    {form
                      .watch(`work_experience.${index}.highlights`)
                      ?.map((_, highlightIndex) => (
                        <div
                          key={highlightIndex}
                          className="border p-3 rounded space-y-2"
                        >
                          <FormLabel>Highlight Items</FormLabel>
                          <div className="space-y-2">
                            {form
                              .watch(
                                `work_experience.${index}.highlights.${highlightIndex}.text`
                              )
                              ?.map((_, textIndex) => (
                                <div key={textIndex} className="flex gap-2">
                                  <FormField
                                    control={control}
                                    name={`work_experience.${index}.highlights.${highlightIndex}.text.${textIndex}`}
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <FormControl>
                                          <Input
                                            placeholder="Achievement or highlight"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const currentTexts = form.getValues(
                                        `work_experience.${index}.highlights.${highlightIndex}.text`
                                      );
                                      const newTexts = currentTexts.filter(
                                        (_, i) => i !== textIndex
                                      );
                                      form.setValue(
                                        `work_experience.${index}.highlights.${highlightIndex}.text`,
                                        newTexts
                                      );
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
                                const currentTexts = form.getValues(
                                  `work_experience.${index}.highlights.${highlightIndex}.text`
                                );
                                form.setValue(
                                  `work_experience.${index}.highlights.${highlightIndex}.text`,
                                  [...currentTexts, ""]
                                );
                              }}
                            >
                              Add Highlight Item
                            </Button>
                          </div>

                          <FormField
                            control={control}
                            name={`work_experience.${index}.highlights.${highlightIndex}.tags`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Highlight Tags</FormLabel>
                                <FormControl>
                                  <div className="space-y-2">
                                    {field.value?.map((tag, tagIndex) => (
                                      <FormField
                                        key={tagIndex}
                                        control={control}
                                        name={`work_experience.${index}.highlights.${highlightIndex}.tags.${tagIndex}`}
                                        render={({ field: tagField }) => (
                                          <FormItem>
                                            <div className="flex gap-2 flex-row-reverse items-center">
                                              <FormControl>
                                                <Input
                                                  {...tagField}
                                                  placeholder={`Tag ${
                                                    tagIndex + 1
                                                  }`}
                                                  list="tags"
                                                />
                                              </FormControl>
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
                                                  field.value?.length <= 1
                                                }
                                              >
                                                Remove tag
                                              </Button>
                                            </div>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    ))}
                                    <Separator className="my-4" />
                                    <div className="flex gap-2">
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          const currentHighlights =
                                            form.getValues(
                                              `work_experience.${index}.highlights`
                                            );
                                          const newHighlights =
                                            currentHighlights.filter(
                                              (_, i) => i !== highlightIndex
                                            );
                                          form.setValue(
                                            `work_experience.${index}.highlights`,
                                            newHighlights
                                          );
                                        }}
                                      >
                                        Remove Highlight
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
                                        Add Highlight Tag
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
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const currentHighlights = form.getValues(
                          `work_experience.${index}.highlights`
                        );
                        form.setValue(`work_experience.${index}.highlights`, [
                          ...currentHighlights,
                          { text: [""], tags: ["#common"] },
                        ]);
                      }}
                    >
                      Add Highlight
                    </Button>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => {
                    remove(index);
                    toast.success("Removed work experience", {
                      position: "top-center",
                    });
                  }}
                >
                  Remove Experience
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

export default WorkExperienceEditForm;
