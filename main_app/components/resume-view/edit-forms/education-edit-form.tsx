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
import {
  EDUCATION_SCHEMA,
} from "@/lib/zod/schemas/resume/education";
import { z } from "zod";

interface EducationEditFormProps {
  title?: string;
  description?: string;
  isEdit?: boolean; // Flag to determine if we're editing existing data
}

function EducationEditForm({ 
  title = "Edit Education",
  description = "Edit your education details and save the changes",
  isEdit = false
}: EducationEditFormProps) {
  const FormSchema = z.object({
    education: EDUCATION_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;
  
  // Dummy data for testing edit functionality
  // TODO: receive actual data
  const dummyEducationForEdit = [
    {
      institution: "Stanford University",
      tags: ["University", "Computer Science", "Technology"],
      field: [
        { text: "Computer Science", tags: ["CS", "Programming"] },
        { text: "Software Engineering", tags: ["Engineering", "Software"] },
      ],
      degree_level: [
        { text: "Master of Science", tags: ["Masters", "Graduate"] },
      ],
      startDate: new Date("2018-09-01"),
      endDate: new Date("2020-06-15"),
      score: "3.8/4.0",
    },
    {
      institution: "University of California, Berkeley",
      tags: ["University", "Public", "California"],
      field: [
        { text: "Computer Science", tags: ["CS", "Programming", "Technology"] },
      ],
      degree_level: [
        { text: "Bachelor of Science", tags: ["Bachelors", "Undergraduate"] },
      ],
      startDate: new Date("2014-08-25"),
      endDate: new Date("2018-05-20"),
      score: "3.6/4.0",
    },
    {
      institution: "Community College of San Francisco",
      tags: ["Community College", "Transfer", "Foundation"],
      field: [
        { text: "General Studies", tags: ["General", "Liberal Arts"] },
      ],
      degree_level: [
        { text: "Associate Degree", tags: ["Associate", "Transfer"] },
      ],
      startDate: new Date("2012-09-01"),
      endDate: new Date("2014-06-10"),
      score: "3.9/4.0",
    },
  ];
  
  // Use dummy data for edit mode or create empty defaults for new entries
  const getDefaultValues = (): FormValues => {
    if (isEdit) {
      return {
        education: dummyEducationForEdit
      };
    }
    
    return {
      education: [
        {
          institution: "",
          tags: [],
          field: [{ text: "", tags: [] }],
          degree_level: [{ text: "", tags: [] }],
          startDate: new Date(),
          endDate: new Date(),
          score: "",
        },
      ],
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(),
  });

  const { control, register, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Updated education data:", data);
    // TODO: Add actual save logic here
  };
  
  return (
    <BaseSheetComponentForEdit title={title} description={description}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg shadow-sm space-y-4"
            >
              <FormField
                control={control}
                name={`education.${index}.institution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="University or institution name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.score`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Score/GPA</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3.8/4.0 or 85%" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <FormField
                  control={control}
                  name={`education.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : new Date())}
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
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : new Date())}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Institution Tags */}
              <FormField
                control={control}
                name={`education.${index}.tags`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution Tags</FormLabel>
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
                                const newTags = field.value?.filter((_, i) => i !== tagIndex) || [];
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

              {/* Field of Study */}
              <div>
                <FormLabel>Field of Study</FormLabel>
                <div className="space-y-4 mt-2">
                  {form.watch(`education.${index}.field`)?.map((_, fieldIndex) => (
                    <div key={fieldIndex} className="border p-3 rounded space-y-2">
                      <FormField
                        control={control}
                        name={`education.${index}.field.${fieldIndex}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Computer Science" {...field} />
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
                            <FormLabel>Field Tags</FormLabel>
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
                                        const newTags = field.value?.filter((_, i) => i !== tagIndex) || [];
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
                                  Add Field Tag
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
                        onClick={() => {
                          const currentFields = form.getValues(`education.${index}.field`);
                          const newFields = currentFields.filter((_, i) => i !== fieldIndex);
                          form.setValue(`education.${index}.field`, newFields);
                        }}
                      >
                        Remove Field
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentFields = form.getValues(`education.${index}.field`);
                      form.setValue(`education.${index}.field`, [
                        ...currentFields,
                        { text: "", tags: [] }
                      ]);
                    }}
                  >
                    Add Field
                  </Button>
                </div>
              </div>

              {/* Degree Level */}
              <div>
                <FormLabel>Degree Level</FormLabel>
                <div className="space-y-4 mt-2">
                  {form.watch(`education.${index}.degree_level`)?.map((_, degreeIndex) => (
                    <div key={degreeIndex} className="border p-3 rounded space-y-2">
                      <FormField
                        control={control}
                        name={`education.${index}.degree_level.${degreeIndex}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Degree Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Bachelor of Science" {...field} />
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
                            <FormLabel>Degree Tags</FormLabel>
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
                                        const newTags = field.value?.filter((_, i) => i !== tagIndex) || [];
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
                                  Add Degree Tag
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
                        onClick={() => {
                          const currentDegrees = form.getValues(`education.${index}.degree_level`);
                          const newDegrees = currentDegrees.filter((_, i) => i !== degreeIndex);
                          form.setValue(`education.${index}.degree_level`, newDegrees);
                        }}
                      >
                        Remove Degree
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentDegrees = form.getValues(`education.${index}.degree_level`);
                      form.setValue(`education.${index}.degree_level`, [
                        ...currentDegrees,
                        { text: "", tags: [] }
                      ]);
                    }}
                  >
                    Add Degree
                  </Button>
                </div>
              </div>

              <Button
                variant="destructive"
                type="button"
                onClick={() => remove(index)}
              >
                Remove Education
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              append({
                institution: "",
                tags: [],
                field: [{ text: "", tags: [] }],
                degree_level: [{ text: "", tags: [] }],
                startDate: new Date(),
                endDate: new Date(),
                score: "",
              })
            }
          >
            Add Education
          </Button>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </BaseSheetComponentForEdit>
  );
}

export default EducationEditForm;
