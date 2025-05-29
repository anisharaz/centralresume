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

interface OthersListEditFormProps {
  title?: string;
  description?: string;
  isEdit?: boolean;
}

function OthersListEditForm({
  title = "Edit Other Lists",
  description = "Edit your other lists and save the changes",
  isEdit = true
}: OthersListEditFormProps) {
  const FormSchema = z.object({
    otherLists: OTHER_LIST_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  // Dummy data for testing edit functionality
  // TODO: receive actual data
  const dummyOtherListsForEdit = [
    {
      tags: ["Volunteer", "Community", "Leadership"],
      heading: [
        {
          text: "Volunteer Work",
          tags: ["Community Service", "Volunteer"],
        },
        {
          text: "Red Cross Blood Drive Coordinator",
          tags: ["Healthcare", "Organization"],
        },
      ],
      summary: [
        {
          text: "Organized and coordinated monthly blood drives for the local community, resulting in 200+ donations annually.",
          tags: ["Organization", "Community Impact", "Healthcare"],
        },
        {
          text: "Managed volunteer teams of 15+ people and liaised with medical professionals to ensure smooth operations.",
          tags: ["Team Management", "Communication", "Leadership"],
        },
      ],
    },
    {
      tags: ["Awards", "Recognition", "Professional"],
      heading: [
        {
          text: "Professional Recognition",
          tags: ["Awards", "Achievement"],
        },
        {
          text: "Employee of the Year 2024",
          tags: ["Excellence", "Performance"],
        },
      ],
      summary: [
        {
          text: "Recognized for outstanding performance and leadership in driving key company initiatives.",
          tags: ["Leadership", "Performance", "Excellence"],
        },
        {
          text: "Led cross-functional team that increased productivity by 35% through process optimization.",
          tags: ["Process Improvement", "Team Leadership", "Results"],
        },
      ],
    },
  ];

  const getDefaultValues = (): FormValues => {
    return {
      otherLists: dummyOtherListsForEdit,
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(),
  });

  const { control, handleSubmit } = form;

  const { fields: otherListFields, append: appendOtherList, remove: removeOtherList } = useFieldArray({
    control,
    name: "otherLists",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Updated other lists data:", data);
    // TODO: Add actual save logic here
  };

  return (
    <BaseSheetComponentForEdit title={title} description={description}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Other Lists</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendOtherList({
                tags: [],
                heading: [],
                summary: [],
              })}
            >
              Add List
            </Button>
          </div>

          {otherListFields.map((item, index) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-sm space-y-4">
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
                                const newTags = field.value?.filter((_: string, i: number) => i !== tagIndex) || [];
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
                          onClick={() => field.onChange([...(field.value || []), ""])}
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

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Save Other Lists
            </Button>
          </div>
        </form>
      </Form>
    </BaseSheetComponentForEdit>
  );
}

// Separate component for heading management
function OtherListHeadingSection({ control, listIndex }: { control: Control<any>, listIndex: number }) {
  const { fields: headingFields, append: appendHeading, remove: removeHeading } = useFieldArray({
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
                  <Input placeholder="e.g., Volunteer Work, Awards, Projects" {...field} />
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
                            const newTags = field.value?.filter((_: string, i: number) => i !== tagIndex) || [];
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
                      onClick={() => field.onChange([...(field.value || []), ""])}
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
function OtherListSummarySection({ control, listIndex }: { control: Control<any>, listIndex: number }) {
  const { fields: summaryFields, append: appendSummary, remove: removeSummary } = useFieldArray({
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
                  <Input placeholder="Describe the activities, achievements, or details" {...field} />
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
                            const newTags = field.value?.filter((_: string, i: number) => i !== tagIndex) || [];
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
                      onClick={() => field.onChange([...(field.value || []), ""])}
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
