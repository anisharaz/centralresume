"use client";

import type { UseFormReturn } from "react-hook-form";
import type { RESUME_TYPE } from "@/lib/zod/schemas";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

interface PersonalDetailsFormProps {
  form: UseFormReturn<RESUME_TYPE>;
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
      <h2 className="text-xl font-semibold">Basic Details</h2>

      {/* Basic Information */}
      <div className="border p-4 rounded-lg shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Profile Information</h3>

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
      <div className="border p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tag Lines of your profile</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer"
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
              onClick={() => removeTagLine(index)}
              className="cursor-pointer"
            >
              Remove Tag Line
            </Button>
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
            variant="outline"
            size="sm"
            onClick={() => appendSummary({ text: "", tags: [] })}
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

            <FormField
              control={control}
              name={`personal_details.summary.${index}.tags`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
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
              onClick={() => removeSummary(index)}
            >
              Remove Summary
            </Button>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

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

      {/* Social Links */}
      <div className="border p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Social Links</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendSocialLink({ name: "", url: "", tags: [] })}
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
              onClick={() => removeSocialLink(index)}
            >
              Remove Social Link
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
