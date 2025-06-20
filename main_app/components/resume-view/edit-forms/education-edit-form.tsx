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
import { EDUCATION_SCHEMA } from "@/lib/zod/schemas/resume/education";
import { z } from "zod";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { updateResume } from "@/app/actions/resume/update-resume";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_TAG_NAME } from "@/lib/vars";
import cookies from "js-cookie";
function EducationEditForm({
  title,
  description,
  dataWithTag,
  resumeTags,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["education"];
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
          className="relative h-full overflow-y-scroll space-y-4 px-2"
        >
          <datalist id="tags">
            {resumeTags.map((item, index) => (
              <option value={item} key={index} />
            ))}
          </datalist>
          {/* Education Section */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Education</h3>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  prepend({
                    institution: "",
                    tags: [currentTag],
                    field: [{ text: "", tags: [currentTag] }],
                    degree_level: [{ text: "", tags: [currentTag] }],
                    startDate: new Date().toISOString().split("T")[0],
                    endDate: new Date().toISOString().split("T")[0],
                    score: "",
                  })
                }
              >
                Add Education
              </Button>
            </div>

            {fields.map((item, index) => (
              <div key={item.id} className="border p-3 rounded space-y-2">
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
                        <Input placeholder="e.g., 3.8/4.0 or 85%" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Institution Tags */}
                <FormField
                  control={control}
                  name={`education.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Institution Tags
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {field.value?.map((tag, tagIndex) => (
                            <FormField
                              key={tagIndex}
                              control={control}
                              name={`education.${index}.tags.${tagIndex}`}
                              render={({ field: tagField }) => (
                                <FormItem>
                                  <div className="flex gap-2 flex-row-reverse items-center">
                                    <FormControl>
                                      <Input
                                        value={tagField.value}
                                        onChange={tagField.onChange}
                                        placeholder={`Tag ${tagIndex + 1}`}
                                        list="tags"
                                      />
                                    </FormControl>
                                    <Button
                                      type="button"
                                      variant="removeTag"
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
                            variant="addTag"
                            size="sm"
                            className="mt-2"
                            onClick={() =>
                              field.onChange([
                                ...(field.value || []),
                                currentTag,
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
                          { text: "", tags: [currentTag] },
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

                        <FormField
                          control={control}
                          name={`education.${index}.field.${fieldIndex}.tags`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-bold">
                                Field Tags
                              </FormLabel>
                              <FormControl>
                                <div className="space-y-2">
                                  {field.value?.map((tag, tagIndex) => (
                                    <FormField
                                      key={tagIndex}
                                      control={control}
                                      name={`education.${index}.field.${fieldIndex}.tags.${tagIndex}`}
                                      render={({ field: tagField }) => (
                                        <FormItem>
                                          <div className="flex gap-2 flex-row-reverse items-center">
                                            <FormControl>
                                              <Input
                                                value={tagField.value}
                                                onChange={tagField.onChange}
                                                placeholder={`Tag ${
                                                  tagIndex + 1
                                                }`}
                                                list="tags"
                                              />
                                            </FormControl>
                                            <Button
                                              type="button"
                                              variant="removeTag"
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
                                  <Button
                                    type="button"
                                    variant="addTag"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() =>
                                      field.onChange([
                                        ...(field.value || []),
                                        currentTag,
                                      ])
                                    }
                                  >
                                    Add Field Tag
                                  </Button>
                                  <Separator className="my-2" />
                                  <div className="flex gap-2">
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => {
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
                                      disabled={
                                        form.watch(`education.${index}.field`)
                                          ?.length <= 1
                                      }
                                    >
                                      Remove Field
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
                          { text: "", tags: [currentTag] },
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

                        <FormField
                          control={control}
                          name={`education.${index}.degree_level.${degreeIndex}.tags`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-bold">
                                Degree Tags
                              </FormLabel>
                              <FormControl>
                                <div className="space-y-2">
                                  {field.value?.map((tag, tagIndex) => (
                                    <FormField
                                      key={tagIndex}
                                      control={control}
                                      name={`education.${index}.degree_level.${degreeIndex}.tags.${tagIndex}`}
                                      render={({ field: tagField }) => (
                                        <FormItem>
                                          <div className="flex gap-2 flex-row-reverse items-center">
                                            <FormControl>
                                              <Input
                                                value={tagField.value}
                                                onChange={tagField.onChange}
                                                placeholder={`Tag ${
                                                  tagIndex + 1
                                                }`}
                                                list="tags"
                                              />
                                            </FormControl>
                                            <Button
                                              type="button"
                                              variant="removeTag"
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
                                  <Button
                                    type="button"
                                    variant="addTag"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() =>
                                      field.onChange([
                                        ...(field.value || []),
                                        currentTag,
                                      ])
                                    }
                                  >
                                    Add Degree Tag
                                  </Button>
                                  <Separator className="my-2" />
                                  <div className="flex gap-2">
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => {
                                        const currentDegrees = form.getValues(
                                          `education.${index}.degree_level`
                                        );
                                        const newDegrees =
                                          currentDegrees.filter(
                                            (_, i) => i !== degreeIndex
                                          );
                                        form.setValue(
                                          `education.${index}.degree_level`,
                                          newDegrees
                                        );
                                      }}
                                      disabled={
                                        form.watch(
                                          `education.${index}.degree_level`
                                        )?.length <= 1
                                      }
                                    >
                                      Remove Degree
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
                  Remove Education
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

export default EducationEditForm;
