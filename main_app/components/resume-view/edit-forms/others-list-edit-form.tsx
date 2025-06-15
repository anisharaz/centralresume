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
import { Separator } from "@/components/ui/separator";

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
    mode: "all",
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
          className="relative h-full overflow-y-scroll space-y-4 px-2"
        >
          {/* Other Lists Section */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Other Lists</h3>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  appendOtherList({
                    tags: ["#common"],
                    heading: [],
                    summary: [],
                  })
                }
              >
                Add Other List
              </Button>
            </div>

            {otherListFields.map((item, index) => (
              <div key={item.id} className="border p-3 rounded space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold">Item {index + 1}</h4>
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
                      <FormLabel className="text-lg font-bold">
                        Item Tags
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {field.value?.map((tag: string, tagIndex: number) => (
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
                                      (_: string, i: number) => i !== tagIndex
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

                {/* Headings Section */}
                <OtherListHeadingSection control={control} listIndex={index} />

                {/* Summary Section */}
                <OtherListSummarySection control={control} listIndex={index} />
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
        <h5 className="text-lg font-bold">Headings</h5>
        <Button
          type="button"
          size="sm"
          className="cursor-pointer"
          onClick={() => appendHeading({ text: "", tags: ["#common"] })}
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
                <FormLabel className="text-lg font-bold">
                  Heading Text
                </FormLabel>
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
                <FormLabel className="text-lg font-bold">
                  Heading Tags
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {field.value?.map((tag: string, tagIndex: number) => (
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
                                (_: string, i: number) => i !== tagIndex
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
                        onClick={() => removeHeading(headingIndex)}
                      >
                        Remove Heading
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          field.onChange([...(field.value || []), "#common"])
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
        <h5 className="text-lg font-bold">Summary</h5>
        <Button
          type="button"
          size="sm"
          className="cursor-pointer"
          onClick={() => appendSummary({ text: "", tags: ["#common"] })}
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
                <FormLabel className="text-lg font-bold">
                  Summary Text
                </FormLabel>
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
                <FormLabel className="text-lg font-bold">
                  Summary Tags
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {field.value?.map((tag: string, tagIndex: number) => (
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
                                (_: string, i: number) => i !== tagIndex
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
                        onClick={() => removeSummary(summaryIndex)}
                      >
                        Remove Summary
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          field.onChange([...(field.value || []), "#common"])
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
  );
}

export default OthersListEditForm;
