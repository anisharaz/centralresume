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
import { SKILLS_SCHEMA } from "@/lib/zod/schemas/resume/skills";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { updateResume } from "@/app/actions/resume/update-resume";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

function SkillsEditForm({
  title,
  description,
  dataWithTag,
  resumeTags,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["skills"];
  resumeTags: string[];
}) {
  const router = useRouter();
  const FormSchema = z.object({
    skills: SKILLS_SCHEMA,
  });
  type FormValues = z.infer<typeof FormSchema>;

  const getDefaultValues = (): FormValues => {
    return {
      skills: dataWithTag,
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(),
    mode: "all",
  });

  const { control, handleSubmit } = form;

  const softSkillsArray = useFieldArray({
    control,
    name: "skills.soft",
  });

  const technicalSkillsArray = useFieldArray({
    control,
    name: "skills.technical",
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Updated skills data:", data);
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

  const skillLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const renderSkillSection = (
    title: string,
    fieldArray: typeof softSkillsArray | typeof technicalSkillsArray,
    fieldName: "skills.soft" | "skills.technical"
  ) => (
    <div className="border p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button
          type="button"
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            fieldArray.prepend({
              name: "",
              level: "",
              tags: ["#common"],
            });
            toast.success(`Added new ${title.split(" ")[0]} skill`, {
              position: "top-center",
            });
          }}
        >
          Add {title.split(" ")[0]} Skill
        </Button>
      </div>

      {fieldArray.fields.map((item, index) => (
        <div key={item.id} className="border p-3 rounded space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`${fieldName}.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Skill Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`${fieldName}.${index}.level`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Level</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name={`${fieldName}.${index}.tags`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Tags</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {field.value?.map((tag, tagIndex) => (
                      <FormField
                        key={tagIndex}
                        control={control}
                        name={`${fieldName}.${index}.tags.${tagIndex}`}
                        render={({ field: tagField }) => (
                          <FormItem>
                            <div className="flex gap-2 flex-row-reverse items-center">
                              <FormControl>
                                <Input
                                  {...tagField}
                                  placeholder={`Tag ${tagIndex + 1}`}
                                  list="tags"
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  const newTags =
                                    field.value?.filter(
                                      (_, i) => i !== tagIndex
                                    ) || [];
                                  field.onChange(newTags);
                                }}
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
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => fieldArray.remove(index)}
                      >
                        Remove Skill
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          field.onChange([...(field.value || []), "#common"])
                        }
                      >
                        Add Tag
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
  );

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
          {renderSkillSection("Soft Skills", softSkillsArray, "skills.soft")}
          {renderSkillSection(
            "Technical Skills",
            technicalSkillsArray,
            "skills.technical"
          )}

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

export default SkillsEditForm;
