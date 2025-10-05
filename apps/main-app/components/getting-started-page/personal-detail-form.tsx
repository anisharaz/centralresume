"use client";

import type { UseFormReturn } from "react-hook-form";
import type { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray, Control, FieldValues } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_TAG_NAME } from "@/lib/vars";

// TagManagement component types
interface TagManagementProps<T extends FieldValues = any> {
  control: Control<T>;
  fieldName: string;
  fieldIndex: number;
  currentTag: string;
  onRemoveField?: () => void;
  removeFieldLabel?: string;
  canRemoveField?: boolean;
}

function TagManagement({
  control,
  fieldName,
  fieldIndex,
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
                            disabled={tagInputField.value === DEFAULT_TAG_NAME}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => removeTag(tagIndex)}
                          disabled={
                            tagFields.length <= 1 ||
                            tagInputField.value === DEFAULT_TAG_NAME
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
              <Separator className="my-4" />
              <div className="flex gap-2">
                {onRemoveField && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={onRemoveField}
                    className="cursor-pointer"
                    disabled={!canRemoveField}
                  >
                    {removeFieldLabel}
                  </Button>
                )}
                <Button
                  type="button"
                  className=""
                  variant="outline"
                  size="sm"
                  onClick={() => appendTag({ tag: "#new" })}
                >
                  Add more TAGs
                </Button>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface PersonalDetailsFormProps {
  form: UseFormReturn<RESUME_SCHEMA_TYPE>;
}

export function PersonalDetailsForm({ form }: PersonalDetailsFormProps) {
  const { control } = form;

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Basic Details</h2>

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
          <h3 className="text-lg font-semibold">Your title</h3>
          <Button
            type="button"
            size="sm"
            className="cursor-pointer"
            onClick={() =>
              appendTagLine({
                text: "edit me",
                tags: [{ tag: "#new" }],
              })
            }
          >
            Add another title
          </Button>
        </div>

        {tagLineFields.map((item, index) => (
          <div key={item.id} className="border p-3 rounded  space-y-2">
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
              currentTag="#new"
              onRemoveField={() => removeTagLine(index)}
              removeFieldLabel="Remove Title"
              canRemoveField={tagLineFields.length > 1}
            />
          </div>
        ))}
        {form.formState.errors.personal_details?.tag_line && (
          <FormField
            control={control}
            name={`personal_details.tag_line`}
            render={({ field }) => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
                tags:
                  summaryFields.length > 0
                    ? [{ tag: "#new" }]
                    : [{ tag: "#common" }],
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
                    <Input
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
              currentTag="#new"
              onRemoveField={() => removeSummary(index)}
              removeFieldLabel="Remove Summary"
              canRemoveField={summaryFields.length > 1}
            />
          </div>
        ))}
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
                tags: [{ tag: "#common" }],
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
              currentTag="#new"
              onRemoveField={() => removeSocialLink(index)}
              removeFieldLabel="Remove Social Link"
              canRemoveField={socialLinkFields.length > 1}
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
        />

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
    </div>
  );
}
