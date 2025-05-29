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

interface PublicationsEditFormProps {
  title?: string;
  description?: string;
  isEdit?: boolean;
}

function PublicationsEditForm({
  title = "Edit Publications",
  description = "Edit your publications and save the changes",
  isEdit = true
}: PublicationsEditFormProps) {
  const FormSchema = z.object({
    publications: PUBLICATION_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  // Dummy data for testing edit functionality
  // TODO: receive actual data
  const dummyPublicationsForEdit = [
    {
      name: "Advanced Machine Learning Techniques in Web Development",
      tags: ["Machine Learning", "Web Development", "Research"],
      publisher: "Journal of Computer Science",
      releaseDate: new Date("2024-03-15"),
      url: "https://doi.org/10.1000/jcs.2024.ml.web",
      summary: [
        {
          text: "Explored novel applications of machine learning algorithms in modern web development frameworks.",
          tags: ["ML", "Algorithms", "Frameworks"],
        },
        {
          text: "Demonstrated 40% improvement in user experience through intelligent content personalization.",
          tags: ["UX", "Personalization", "Performance"],
        },
      ],
    },
    {
      name: "Scalable Architecture Patterns for Cloud-Native Applications",
      tags: ["Cloud Computing", "Architecture", "Scalability"],
      publisher: "IEEE Software Engineering",
      releaseDate: new Date("2023-11-20"),
      url: "https://doi.org/10.1109/ieee.2023.cloud.patterns",
      summary: [
        {
          text: "Comprehensive analysis of microservices architecture patterns for large-scale cloud deployments.",
          tags: ["Microservices", "Cloud", "Patterns"],
        },
      ],
    },
  ];

  const getDefaultValues = (): FormValues => {
    return {
      publications: dummyPublicationsForEdit,
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(),
  });

  const { control, handleSubmit } = form;

  const { fields: publicationFields, append: appendPublication, remove: removePublication } = useFieldArray({
    control,
    name: "publications",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Updated publications data:", data);
    // TODO: Add actual save logic here
  };

  return (
    <BaseSheetComponentForEdit title={title} description={description}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Publications</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendPublication({
                name: "",
                tags: [],
                publisher: "",
                releaseDate: new Date(),
                url: "",
                summary: [],
              })}
            >
              Add Publication
            </Button>
          </div>

          {publicationFields.map((item, index) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium">Publication {index + 1}</h4>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removePublication(index)}
                >
                  Remove Publication
                </Button>
              </div>

              {/* Basic Publication Information */}
              <FormField
                control={control}
                name={`publications.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publication Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter publication title" {...field} />
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
                      <FormLabel>Publisher</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., IEEE, ACM, Journal Name" {...field} />
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
                      <FormLabel>Release Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
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
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://doi.org/... or publication URL" {...field} />
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
                    <FormLabel>Publication Tags</FormLabel>
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

              {/* Publication Summary */}
              <PublicationSummarySection control={control} publicationIndex={index} />
            </div>
          ))}

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Save Publications
            </Button>
          </div>
        </form>
      </Form>
    </BaseSheetComponentForEdit>
  );
}

// Separate component for publication summary management
function PublicationSummarySection({ control, publicationIndex }: { control: Control<any>, publicationIndex: number }) {
  const { fields: summaryFields, append: appendSummary, remove: removeSummary } = useFieldArray({
    control,
    name: `publications.${publicationIndex}.summary`,
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
            name={`publications.${publicationIndex}.summary.${summaryIndex}.text`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary Text</FormLabel>
                <FormControl>
                  <Input placeholder="Describe the publication's key findings or contributions" {...field} />
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

export default PublicationsEditForm;
