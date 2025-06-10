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
import { useForm, useFieldArray, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OTHER_LIST_SCHEMA } from "@/lib/zod/schemas/resume/other-list";
import { z } from "zod";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { updateResume } from "@/app/actions/resume/update-resume";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function OthersListEditForm({
  title,
  description,
  dataWithTag,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["otherLists"];
}) {
  const router = useRouter();
  const FormSchema = z.object({
    otherLists: OTHER_LIST_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  const getDefaultValues = (): FormValues => {
    return {
      otherLists: dataWithTag,
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(),
  });

  const { control, handleSubmit } = form;

  const {
    fields: otherListFields,
    append: appendOtherList,
    remove: removeOtherList,
  } = useFieldArray({
    control,
    name: "otherLists",
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Updated other lists data:", data);
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

  return (
    <BaseSheetComponentForEdit title={title} description={description}>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col px-2"
        >
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Other Lists</h3>
            </div>

            {otherListFields.map((item, index) => (
              <div
                key={item.id}
                className="border p-4 rounded-lg shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium">List {index + 1}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeOtherList(index)}
                  >
                    Remove List
                  </Button>
                </div>

                {/* List Tags */}
                <FormField
                  control={control}
                  name={`otherLists.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>List Tags</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {field.value?.map((tag: string, tagIndex: number) => (
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
                                      (_: string, i: number) => i !== tagIndex
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

                {/* Headings Section */}
                <OtherListHeadingSection control={control} listIndex={index} />

                {/* Summary Section */}
                <OtherListSummarySection control={control} listIndex={index} />
              </div>
            ))}
          </div>

          {/* Fixed submit button at bottom */}
          <div className="flex-shrink-0 border-t bg-background p-4">
            <div className="flex gap-5">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex-1"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin mr-2" />
                )}
                Submit
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendOtherList({
                    tags: [],
                    heading: [],
                    summary: [],
                  })
                }
              >
                Add New
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </BaseSheetComponentForEdit>
  );
}

// Separate component for heading management
function OtherListHeadingSection({
  control,
  listIndex,
}: {
  control: Control<any>;
  listIndex: number;
}) {
  const {
    fields: headingFields,
    append: appendHeading,
    remove: removeHeading,
  } = useFieldArray({
    control,
    name: `otherLists.${listIndex}.heading`,
  });

  return (
    <div className="border p-3 rounded space-y-4">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium">Headings</h5>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendHeading({ text: "", tags: [] })}
        >
          Add Heading
        </Button>
      </div>

      {headingFields.map((item, headingIndex) => (
        <div key={item.id} className="border p-2 rounded space-y-2">
          <FormField
            control={control}
            name={`otherLists.${listIndex}.heading.${headingIndex}.text`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heading Text</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Volunteer Work, Awards, Projects"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`otherLists.${listIndex}.heading.${headingIndex}.tags`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heading Tags</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {field.value?.map((tag: string, tagIndex: number) => (
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
                                (_: string, i: number) => i !== tagIndex
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

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => removeHeading(headingIndex)}
          >
            Remove Heading
          </Button>
        </div>
      ))}
    </div>
  );
}

// Separate component for summary management
function OtherListSummarySection({
  control,
  listIndex,
}: {
  control: Control<any>;
  listIndex: number;
}) {
  const {
    fields: summaryFields,
    append: appendSummary,
    remove: removeSummary,
  } = useFieldArray({
    control,
    name: `otherLists.${listIndex}.summary`,
  });

  return (
    <div className="border p-3 rounded space-y-4">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium">Summary</h5>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendSummary({ text: "", tags: [] })}
        >
          Add Summary
        </Button>
      </div>

      {summaryFields.map((item, summaryIndex) => (
        <div key={item.id} className="border p-2 rounded space-y-2">
          <FormField
            control={control}
            name={`otherLists.${listIndex}.summary.${summaryIndex}.text`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary Text</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Describe the activities, achievements, or details"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`otherLists.${listIndex}.summary.${summaryIndex}.tags`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary Tags</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {field.value?.map((tag: string, tagIndex: number) => (
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
                                (_: string, i: number) => i !== tagIndex
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

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => removeSummary(summaryIndex)}
          >
            Remove Summary
          </Button>
        </div>
      ))}
    </div>
  );
}

export default OthersListEditForm;
