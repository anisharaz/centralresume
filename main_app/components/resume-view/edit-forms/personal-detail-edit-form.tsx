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
import { PERSONAL_DETAILS_SCHEMA } from "@/lib/zod/schemas/resume/personal-detail";
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
  fieldIndex: number;
  resumeTags: string[];
  currentTag: string;
  onRemoveField?: () => void;
  removeFieldLabel?: string;
  canRemoveField?: boolean;
}

function TagManagement({
  control,
  fieldName,
  fieldIndex,
  resumeTags,
  currentTag,
  onRemoveField,
  removeFieldLabel = "Remove",
  canRemoveField = true,
}: TagManagementProps) {
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: `${fieldName}.${fieldIndex}.tags`,
  });

  return (
    <FormField
      control={control}
      name={`${fieldName}.${fieldIndex}.tags`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {tagFields.map((tagField, tagIndex) => (
                <FormField
                  key={tagField.id}
                  control={control}
                  name={`${fieldName}.${fieldIndex}.tags.${tagIndex}.tag`}
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
                Add more TAGs
              </Button>
              <Separator className="my-2" />
              {onRemoveField && (
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
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PersonalDetailEditForm({
  title,
  description,
  dataWithTag,
  resumeTags,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["personal_details"];
  resumeTags: string[];
}) {
  const router = useRouter();
  const currentTag = cookies.get("currentTag") || DEFAULT_TAG_NAME;

  const FormSchema = z.object({
    personal_details: PERSONAL_DETAILS_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      personal_details: dataWithTag,
    },
    mode: "all",
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
          onSubmit={handleSubmit(onSubmit, (err) => {
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
          {/* Basic Information */}
          <div className="border p-4 rounded-lg shadow-sm space-y-4">
            <div className="text-lg font-semibold">Profile Information</div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <FormField
                control={control}
                name="personal_details.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="personal_details.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="personal_details.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
          </div>

          {/* Tag Lines */}
          <div className="border p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Title of your profile</h3>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  appendTagLine({
                    text: "edit me",
                    tags: [
                      {
                        tag: currentTag,
                      },
                    ],
                  })
                }
              >
                Add another title
              </Button>
            </div>
            {tagLineFields.map((item, index) => (
              <div key={item.id} className="border p-3 rounded space-y-2">
                <FormField
                  control={control}
                  name={`personal_details.tag_line.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title Text</FormLabel>
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

                <TagManagement
                  control={control}
                  fieldName="personal_details.tag_line"
                  fieldIndex={index}
                  resumeTags={resumeTags}
                  currentTag={currentTag}
                  onRemoveField={() => removeTagLine(index)}
                  removeFieldLabel="Remove Title"
                  canRemoveField={tagLineFields.length > 1}
                />
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
              <h3 className="text-lg font-semibold">Summary of your profile</h3>
              <Button
                type="button"
                size="sm"
                onClick={() =>
                  appendSummary({
                    text: "I thrive in working better.",
                    tags: [{ tag: currentTag }],
                  })
                }
                className="cursor-pointer"
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
                        <Textarea
                          placeholder="Describe yourself professionally"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <TagManagement
                  control={control}
                  fieldName="personal_details.summary"
                  fieldIndex={index}
                  resumeTags={resumeTags}
                  currentTag={currentTag}
                  onRemoveField={() => removeSummary(index)}
                  removeFieldLabel="Remove Summary"
                  canRemoveField={summaryFields.length > 1}
                />
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
            />{" "}
            <div className="grid grid-cols-2 gap-4">
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
                size="sm"
                onClick={() =>
                  appendSocialLink({
                    name: "",
                    url: "",
                    tags: [{ tag: currentTag }],
                  })
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

                <TagManagement
                  control={control}
                  fieldName="personal_details.social_links"
                  fieldIndex={index}
                  resumeTags={resumeTags}
                  currentTag={currentTag}
                  onRemoveField={() => removeSocialLink(index)}
                  removeFieldLabel="Remove Social Link"
                  canRemoveField={socialLinkFields.length > 1}
                />
              </div>
            ))}
          </div>
          <div className="sticky bottom-0 bg-background p-4 border-t">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
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

export default PersonalDetailEditForm;
