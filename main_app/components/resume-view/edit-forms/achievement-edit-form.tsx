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
  ACHIEVEMENT_SCHEMA,
} from "@/lib/zod/schemas/resume/achievement";
import { z } from "zod";

interface AchievementEditFormProps {
  title?: string;
  description?: string;
  isEdit?: boolean; // Flag to determine if we're editing existing data
}

function AchievementEditForm({ 
  title = "Edit Achievements",
  description = "Edit your achievements and save the changes",
  isEdit = false
}: AchievementEditFormProps) {
  const FormSchema = z.object({
    achievements: ACHIEVEMENT_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;
  
  // Dummy data for testing edit functionality
  // TODO: receive actual data
  const dummyAchievementsForEdit = [
    {
      title: "Excellence in Software Development Award",
      tags: ["Software", "Excellence", "Recognition"],
      date: new Date("2023-12-15"),
      awarded_by: "Tech Innovation Society",
      summary: [
        {
          text: "Recognized for outstanding contributions to open-source projects.",
          tags: ["Open Source", "Community", "Impact"],
        },
        {
          text: "Led development of a widely-adopted library with 10k+ downloads.",
          tags: ["Leadership", "Library", "Popular"],
        },
      ],
    },
    {
      title: "Best Employee of the Year",
      tags: ["Employee", "Performance", "Annual"],
      date: new Date("2022-11-30"),
      awarded_by: "TechCorp Inc.",
      summary: [
        {
          text: "Achieved highest performance rating for exceptional project delivery.",
          tags: ["Performance", "Delivery", "Excellence"],
        },
        {
          text: "Mentored junior developers and improved team productivity by 25%.",
          tags: ["Mentoring", "Productivity", "Team"],
        },
      ],
    },
    {
      title: "Hackathon Winner - AI Innovation Challenge",
      tags: ["Hackathon", "AI", "Innovation", "Competition"],
      date: new Date("2024-03-22"),
      awarded_by: "AI Tech Conference",
      summary: [
        {
          text: "Developed an AI-powered solution for sustainable agriculture.",
          tags: ["AI", "Agriculture", "Sustainability"],
        },
        {
          text: "Solution was adopted by 3 local farms and increased yield by 15%.",
          tags: ["Adoption", "Impact", "Agriculture"],
        },
      ],
    },
  ];
  
  // Use dummy data for edit mode or create empty defaults for new entries
  const getDefaultValues = (): FormValues => {
    if (isEdit) {
      return {
        achievements: dummyAchievementsForEdit
      };
    }
    
    return {
      achievements: [
        {
          title: "",
          tags: [],
          date: new Date(),
          awarded_by: "",
          summary: [{ text: "", tags: [] }],
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
    name: "achievements",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Updated achievements data:", data);
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
                name={`achievements.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Achievement Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Achievement title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`achievements.${index}.awarded_by`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Awarded By</FormLabel>
                    <FormControl>
                      <Input placeholder="Organization or institution" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`achievements.${index}.date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
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

              {/* Achievement Tags */}
              <FormField
                control={control}
                name={`achievements.${index}.tags`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Achievement Tags</FormLabel>
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

              {/* Summary */}
              <div>
                <FormLabel>Summary</FormLabel>
                <div className="space-y-4 mt-2">
                  {form.watch(`achievements.${index}.summary`)?.map((_, summaryIndex) => (
                    <div key={summaryIndex} className="border p-3 rounded space-y-2">
                      <FormField
                        control={control}
                        name={`achievements.${index}.summary.${summaryIndex}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Summary Text</FormLabel>
                            <FormControl>
                              <Input placeholder="Describe your achievement" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={control}
                        name={`achievements.${index}.summary.${summaryIndex}.tags`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Summary Tags</FormLabel>
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
                                  Add Summary Tag
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
                          const currentSummary = form.getValues(`achievements.${index}.summary`);
                          const newSummary = currentSummary.filter((_, i) => i !== summaryIndex);
                          form.setValue(`achievements.${index}.summary`, newSummary);
                        }}
                      >
                        Remove Summary
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentSummary = form.getValues(`achievements.${index}.summary`);
                      form.setValue(`achievements.${index}.summary`, [
                        ...currentSummary,
                        { text: "", tags: [] }
                      ]);
                    }}
                  >
                    Add Summary
                  </Button>
                </div>
              </div>

              <Button
                variant="destructive"
                type="button"
                onClick={() => remove(index)}
              >
                Remove Achievement
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              append({
                title: "",
                tags: [],
                date: new Date(),
                awarded_by: "",
                summary: [{ text: "", tags: [] }],
              })
            }
          >
            Add Achievement
          </Button>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </BaseSheetComponentForEdit>
  );
}

export default AchievementEditForm;
