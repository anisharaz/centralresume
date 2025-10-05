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
import { EDUCATION_SCHEMA } from "@centralresume/resume-core/schema";
import { z } from "zod";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";
import { updateResume } from "@/app/actions/resume/update-resume";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DEFAULT_TAG_NAME } from "@/lib/vars";
import cookies from "js-cookie";
import { TagManagement } from "./tag-management-form";
import { Separator } from "@/components/ui/separator";

function EducationEditForm({
  title,
  description,
  dataWithTag,
  resumeTags,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_SCHEMA_TYPE["education"];
  resumeTags: string[];
}) {
  const router = useRouter();
  const currentTag = cookies.get("currentTag") || DEFAULT_TAG_NAME;
  const FormSchema = z.object({
    education: EDUCATION_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  const getDefaultValues = (): FormValues => {
    return {
      education: dataWithTag,
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(),
    mode: "all",
  });

  const { control, handleSubmit } = form;

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Updated education data:", data);
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
          {/* Education Section */}
          <div className="p-2 space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold">Education</h3>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  prepend({
                    institution: "",
                    tags: [{ tag: currentTag }],
                    field: [{ text: "", tags: [{ tag: currentTag }] }],
                    degree_level: [{ text: "", tags: [{ tag: currentTag }] }],
                    startDate: new Date().toISOString().split("T")[0],
                    endDate: new Date().toISOString().split("T")[0],
                    score: "",
                  })
                }
              >
                Add Education
              </Button>
            </div>
            <div className="space-y-4">
              {fields.map((item, index) => (
                <div key={item.id}>
                  <div className="relative">
                    <Separator className="my-2 border-4 rounded-xl border-foreground/50" />
                    <div className="absolute text-2xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                      {index + 1} / / {fields.length}
                    </div>
                  </div>
                  <div className="border p-3 rounded space-y-2">
                    <FormField
                      control={control}
                      name={`education.${index}.institution`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold">
                            Institution
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="University or institution name"
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
                        name={`education.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">
                              Start Date
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

                      <FormField
                        control={control}
                        name={`education.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">
                              End Date
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
                      name={`education.${index}.score`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold">
                            Score/GPA
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 3.8/4.0 or 85%"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <TagManagement
                      control={control}
                      fieldName={`education.${index}.tags`}
                      resumeTags={resumeTags}
                      currentTag={currentTag}
                      tagLabel="Institution Tags"
                    />

                    {/* Field of Study */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-lg font-bold">
                          Field of Study
                        </FormLabel>
                        <Button
                          type="button"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => {
                            const currentFields = form.getValues(
                              `education.${index}.field`
                            );
                            form.setValue(`education.${index}.field`, [
                              ...currentFields,
                              { text: "", tags: [{ tag: currentTag }] },
                            ]);
                          }}
                        >
                          Add Field
                        </Button>
                      </div>

                      {form
                        .watch(`education.${index}.field`)
                        ?.map((_, fieldIndex) => (
                          <div
                            key={fieldIndex}
                            className="border p-2 rounded space-y-2"
                          >
                            <FormField
                              control={control}
                              name={`education.${index}.field.${fieldIndex}.text`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-lg font-bold">
                                    Field Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., Computer Science"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <TagManagement
                              control={control}
                              fieldName={`education.${index}.field.${fieldIndex}.tags`}
                              resumeTags={resumeTags}
                              currentTag={currentTag}
                              onRemoveField={() => {
                                const currentFields = form.getValues(
                                  `education.${index}.field`
                                );
                                const newFields = currentFields.filter(
                                  (_, i) => i !== fieldIndex
                                );
                                form.setValue(
                                  `education.${index}.field`,
                                  newFields
                                );
                              }}
                              removeFieldLabel="Remove Field"
                              canRemoveField={
                                form.watch(`education.${index}.field`)?.length >
                                1
                              }
                              tagLabel="Field Tags"
                            />
                          </div>
                        ))}
                    </div>

                    {/* Degree Level */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-lg font-bold">
                          Degree Level
                        </FormLabel>
                        <Button
                          type="button"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => {
                            const currentDegrees = form.getValues(
                              `education.${index}.degree_level`
                            );
                            form.setValue(`education.${index}.degree_level`, [
                              ...currentDegrees,
                              { text: "", tags: [{ tag: currentTag }] },
                            ]);
                          }}
                        >
                          Add Degree
                        </Button>
                      </div>

                      {form
                        .watch(`education.${index}.degree_level`)
                        ?.map((_, degreeIndex) => (
                          <div
                            key={degreeIndex}
                            className="border p-2 rounded space-y-2"
                          >
                            <FormField
                              control={control}
                              name={`education.${index}.degree_level.${degreeIndex}.text`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-lg font-bold">
                                    Degree Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., Bachelor of Science"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <TagManagement
                              control={control}
                              fieldName={`education.${index}.degree_level.${degreeIndex}.tags`}
                              resumeTags={resumeTags}
                              currentTag={currentTag}
                              onRemoveField={() => {
                                const currentDegrees = form.getValues(
                                  `education.${index}.degree_level`
                                );
                                const newDegrees = currentDegrees.filter(
                                  (_, i) => i !== degreeIndex
                                );
                                form.setValue(
                                  `education.${index}.degree_level`,
                                  newDegrees
                                );
                              }}
                              removeFieldLabel="Remove Degree"
                              canRemoveField={
                                form.watch(`education.${index}.degree_level`)
                                  ?.length > 1
                              }
                              tagLabel="Degree Tags"
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
                      Remove Education
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

export default EducationEditForm;
