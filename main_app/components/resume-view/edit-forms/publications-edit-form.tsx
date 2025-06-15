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
import { PUBLICATION_SCHEMA } from "@/lib/zod/schemas/resume/publication";
import { z } from "zod";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { updateResume } from "@/app/actions/resume/update-resume";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

function PublicationsEditForm({
  title,
  description,
  dataWithTag,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["publications"];
}) {
  const router = useRouter();
  const FormSchema = z.object({
    publications: PUBLICATION_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  const getDefaultValues = (): FormValues => {
    return {
      publications: dataWithTag,
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(),
    mode: "all",
  });

  const { control, handleSubmit } = form;

  const {
    fields: publicationFields,
    append: appendPublication,
    remove: removePublication,
  } = useFieldArray({
    control,
    name: "publications",
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Updated publications data:", data);
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
          {/* Publications Section */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Publications</h3>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  appendPublication({
                    name: "",
                    tags: ["#common"],
                    publisher: "",
                    releaseDate: new Date().toISOString().split("T")[0],
                    url: "",
                    summary: [],
                  })
                }
              >
                Add Publication
              </Button>
            </div>

            {publicationFields.map((item, index) => (
              <div key={item.id} className="border p-3 rounded space-y-2">
                <FormField
                  control={control}
                  name={`publications.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Publication Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter publication title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`publications.${index}.publisher`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-bold">
                          Publisher
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., IEEE, ACM, Journal Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`publications.${index}.releaseDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-bold">
                          Release Date
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
                  name={`publications.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://doi.org/... or publication URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Publication Tags */}
                <FormField
                  control={control}
                  name={`publications.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Publication Tags
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

                {/* Publication Summary */}
                <PublicationSummarySection
                  control={control}
                  publicationIndex={index}
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removePublication(index)}
                >
                  Remove Publication
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

// Separate component for publication summary management
function PublicationSummarySection({
  control,
  publicationIndex,
}: {
  control: Control<any>;
  publicationIndex: number;
}) {
  const {
    fields: summaryFields,
    append: appendSummary,
    remove: removeSummary,
  } = useFieldArray({
    control,
    name: `publications.${publicationIndex}.summary`,
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
            name={`publications.${publicationIndex}.summary.${summaryIndex}.text`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">
                  Summary Text
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Describe the publication's key findings or contributions"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`publications.${publicationIndex}.summary.${summaryIndex}.tags`}
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

export default PublicationsEditForm;
