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
import { PERSONAL_DETAILS_SCHEMA } from "@/lib/zod/schemas/resume/personal-detail";
import { z } from "zod";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { updateResume } from "@/app/actions/resume/update-resume";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function PersonalDetailEditForm({
  title,
  description,
  dataWithTag,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["personal_details"];
}) {
  const router = useRouter();
  const FormSchema = z.object({
    personal_details: PERSONAL_DETAILS_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      personal_details: dataWithTag,
    },
    mode: "onChange",
  });

  const { control, handleSubmit } = form;

  const {
    fields: tagLineFields,
    append: appendTagLine,
    remove: removeTagLine,
  } = useFieldArray({
    control,
    name: "personal_details.tag_line",
  });

  const {
    fields: summaryFields,
    append: appendSummary,
    remove: removeSummary,
  } = useFieldArray({
    control,
    name: "personal_details.summary",
  });

  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control,
    name: "personal_details.social_links",
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Updated personal details data:", data);
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
          {/* Basic Information */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <FormField
              control={control}
              name="personal_details.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="personal_details.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="personal_details.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="personal_details.date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tag Lines */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tag Lines</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendTagLine({ text: "", tags: [] })}
              >
                Add Tag Line
              </Button>
            </div>
            {tagLineFields.map((item, index) => (
              <div key={item.id} className="border p-3 rounded space-y-2">
                <FormField
                  control={control}
                  name={`personal_details.tag_line.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag Line Text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Full Stack Developer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`personal_details.tag_line.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
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

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeTagLine(index)}
                >
                  Remove Tag Line
                </Button>
              </div>
            ))}
            <FormField
              control={control}
              name={`personal_details.tag_line`}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Summary */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Summary</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendSummary({ text: "", tags: [] })}
              >
                Add Summary
              </Button>
            </div>
            {summaryFields.map((item, index) => (
              <div key={item.id} className="border p-3 rounded space-y-2">
                <FormField
                  control={control}
                  name={`personal_details.summary.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary Text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describe yourself professionally"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`personal_details.summary.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
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

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSummary(index)}
                >
                  Remove Summary
                </Button>
              </div>
            ))}
          </div>

          {/* Address */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Address</h3>

            <FormField
              control={control}
              name="personal_details.address.address_line"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Apt 4B" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="personal_details.address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="San Francisco" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="personal_details.address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="United States" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Social Links</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendSocialLink({ name: "", url: "", tags: [] })
                }
              >
                Add Social Link
              </Button>
            </div>
            {socialLinkFields.map((item, index) => (
              <div key={item.id} className="border p-3 rounded space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`personal_details.social_links.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., LinkedIn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`personal_details.social_links.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name={`personal_details.social_links.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
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

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSocialLink(index)}
                >
                  Remove Social Link
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full sticky bottom-0"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin mr-2" />
            )}
            Save Changes
          </Button>
        </form>
      </Form>
    </BaseSheetComponentForEdit>
  );
}

export default PersonalDetailEditForm;
