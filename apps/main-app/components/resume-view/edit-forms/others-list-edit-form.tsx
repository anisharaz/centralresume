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
import { OTHER_LIST_SCHEMA } from "@centralresume/resume-core/schema";
import { z } from "zod";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";
import { updateResume } from "@/app/actions/resume/update-resume";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_TAG_NAME } from "@/lib/vars";
import cookies from "js-cookie";
import { TagManagement } from "./tag-management-form";
import { Separator } from "@/components/ui/separator";

function OthersListEditForm({
  title,
  description,
  dataWithTag,
  resumeTags,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_SCHEMA_TYPE["otherLists"];
  resumeTags: string[];
}) {
  const router = useRouter();
  const currentTag = cookies.get("currentTag") || DEFAULT_TAG_NAME;

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
          {/* Other Lists Section */}
          <div className="p-2 space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold">Other Lists</h3>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  appendOtherList({
                    tags: [{ tag: currentTag }],
                    heading: [],
                    summary: [],
                  })
                }
              >
                Add Other List
              </Button>
            </div>
            <div className="space-y-4">
              {otherListFields.map((item, index) => (
                <div key={item.id}>
                  <div className="relative">
                    <Separator className="my-2 border-4 rounded-xl border-foreground/50" />
                    <div className="absolute text-2xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                      {index + 1} / {otherListFields.length}
                    </div>
                  </div>
                  <div className="border p-3 rounded space-y-2">
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

                    <TagManagement
                      control={control}
                      fieldName={`otherLists.${index}.tags`}
                      resumeTags={resumeTags}
                      currentTag={currentTag}
                      tagLabel="Item Tags"
                    />

                    {/* Headings Section */}
                    <OtherListHeadingSection
                      control={control}
                      listIndex={index}
                      currentTag={currentTag}
                      resumeTags={resumeTags}
                    />

                    {/* Summary Section */}
                    <OtherListSummarySection
                      control={control}
                      listIndex={index}
                      currentTag={currentTag}
                      resumeTags={resumeTags}
                    />
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

// Separate component for heading management
function OtherListHeadingSection({
  control,
  listIndex,
  currentTag,
  resumeTags,
}: {
  control: Control<any>;
  listIndex: number;
  currentTag: string;
  resumeTags: string[];
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
          onClick={() =>
            appendHeading({ text: "", tags: [{ tag: currentTag }] })
          }
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

          <TagManagement
            control={control}
            fieldName={`otherLists.${listIndex}.heading.${headingIndex}.tags`}
            resumeTags={resumeTags}
            currentTag={currentTag}
            onRemoveField={() => removeHeading(headingIndex)}
            removeFieldLabel="Remove Heading"
            tagLabel="Heading Tags"
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
  currentTag,
  resumeTags,
}: {
  control: Control<any>;
  listIndex: number;
  currentTag: string;
  resumeTags: string[];
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
          onClick={() =>
            appendSummary({ text: "", tags: [{ tag: currentTag }] })
          }
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
                  <Textarea
                    placeholder="Describe the activities, achievements, or details"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <TagManagement
            control={control}
            fieldName={`otherLists.${listIndex}.summary.${summaryIndex}.tags`}
            resumeTags={resumeTags}
            currentTag={currentTag}
            onRemoveField={() => removeSummary(summaryIndex)}
            removeFieldLabel="Remove Summary"
            tagLabel="Summary Tags"
          />
        </div>
      ))}
    </div>
  );
}

export default OthersListEditForm;
