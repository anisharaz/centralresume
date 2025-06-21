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
import { useForm, useFieldArray, Control, FieldValues } from "react-hook-form";
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
import cookies from "js-cookie";
import { DEFAULT_TAG_NAME } from "@/lib/vars";

// TagManagement component types
interface TagManagementProps<T extends FieldValues = any> {
  control: Control<T>;
  fieldName: string;
  resumeTags: string[];
  currentTag: string;
  onRemoveField?: () => void;
  removeFieldLabel?: string;
  canRemoveField?: boolean;
  tagLabel?: string;
}

function TagManagement({
  control,
  fieldName,
  resumeTags,
  currentTag,
  onRemoveField,
  removeFieldLabel = "Remove",
  canRemoveField = true,
  tagLabel = "Tags",
}: TagManagementProps) {
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: fieldName,
  });

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{tagLabel}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {tagFields.map((tagField, tagIndex) => (
                <FormField
                  key={tagField.id}
                  control={control}
                  name={`${fieldName}.${tagIndex}.tag`}
                  render={({ field: tagInputField }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <FormControl>
                          <Input
                            {...tagInputField}
                            placeholder={`Tag ${tagIndex + 1}`}
                            list="tags"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          size="sm"
                          variant="removeTag"
                          onClick={() => removeTag(tagIndex)}
                          disabled={tagFields.length <= 1}
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
                className="mt-2"
                variant="addTag"
                size="sm"
                onClick={() => appendTag({ tag: currentTag })}
              >
                Add Tag
              </Button>
              {onRemoveField && (
                <>
                  <Separator className="my-2" />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={onRemoveField}
                      className="cursor-pointer"
                      disabled={!canRemoveField}
                    >
                      {removeFieldLabel}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

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
  const currentTag = cookies.get("currentTag") || DEFAULT_TAG_NAME;
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
                    tags: [{ tag: currentTag }],
                    website: "",
                    start_date: new Date().toISOString().split("T")[0],
                    end_date: undefined,
                    position: [{ text: "", tags: [{ tag: currentTag }] }],
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
                <TagManagement
                  control={control}
                  fieldName={`work_experience.${index}.tags`}
                  resumeTags={resumeTags}
                  currentTag={currentTag}
                  tagLabel="Company Tags"
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

                          <TagManagement
                            control={control}
                            fieldName={`work_experience.${index}.position.${posIndex}.tags`}
                            resumeTags={resumeTags}
                            currentTag={currentTag}
                            tagLabel="Position Tags"
                            onRemoveField={() => {
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
                            removeFieldLabel="Remove Position"
                            canRemoveField={
                              form.watch(`work_experience.${index}.position`)
                                ?.length > 1
                            }
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
                          { text: "", tags: [{ tag: currentTag }] },
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

                          <TagManagement
                            control={control}
                            fieldName={`work_experience.${index}.summary.${summaryIndex}.tags`}
                            resumeTags={resumeTags}
                            currentTag={currentTag}
                            tagLabel="Summary Tags"
                            onRemoveField={() => {
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
                            removeFieldLabel="Remove Summary"
                            canRemoveField={true}
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
                          { text: "", tags: [{ tag: currentTag }] },
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

                          <TagManagement
                            control={control}
                            fieldName={`work_experience.${index}.highlights.${highlightIndex}.tags`}
                            resumeTags={resumeTags}
                            currentTag={currentTag}
                            tagLabel="Highlight Tags"
                            onRemoveField={() => {
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
                            removeFieldLabel="Remove Highlight"
                            canRemoveField={true}
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
                          { text: [""], tags: [{ tag: currentTag }] },
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
