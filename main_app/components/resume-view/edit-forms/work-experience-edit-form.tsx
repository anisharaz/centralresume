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

function WorkExperienceEditForm({
  title,
  description,
  dataWithTag,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["work_experience"];
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
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg shadow-sm space-y-4"
            >
              <FormField
                control={control}
                name={`work_experience.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
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

              <div className="flex gap-4">
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

              {/* Positions */}
              <div>
                <FormLabel>Positions</FormLabel>
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
                                    Add Position Tag
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
                            const currentPositions = form.getValues(
                              `work_experience.${index}.position`
                            );
                            const newPositions = currentPositions.filter(
                              (_, i) => i !== posIndex
                            );
                            form.setValue(
                              `work_experience.${index}.position`,
                              newPositions
                            );
                          }}
                        >
                          Remove Position
                        </Button>
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
                        { text: "", tags: [] },
                      ]);
                    }}
                  >
                    Add Position
                  </Button>
                </div>
              </div>

              {/* Summary */}
              <div>
                <FormLabel>Summary</FormLabel>
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
                                <Input
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
                              `work_experience.${index}.summary`
                            );
                            const newSummary = currentSummary.filter(
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
                        { text: "", tags: [] },
                      ]);
                    }}
                  >
                    Add Summary
                  </Button>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <FormLabel>Highlights</FormLabel>
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
                                    Add Highlight Tag
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
                            const currentHighlights = form.getValues(
                              `work_experience.${index}.highlights`
                            );
                            const newHighlights = currentHighlights.filter(
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
                        { text: [""], tags: [] },
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
                onClick={() => remove(index)}
              >
                Remove Experience
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
                  company: "",
                  tags: [],
                  website: "",
                  start_date: new Date().toISOString().split("T")[0],
                  end_date: undefined,
                  position: [{ text: "", tags: [] }],
                  summary: [{ text: "", tags: [] }],
                  highlights: [{ text: [""], tags: [] }],
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

export default WorkExperienceEditForm;
