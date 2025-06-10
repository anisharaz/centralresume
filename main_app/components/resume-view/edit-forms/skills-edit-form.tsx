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

function SkillsEditForm({
  title,
  description,
  dataWithTag,
}: {
  title: string;
  description: string;
  dataWithTag: RESUME_TYPE["skills"];
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>

      {fieldArray.fields.map((item, index) => (
        <div key={item.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex gap-4">
            <FormField
              control={control}
              name={`${fieldName}.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Skill Name</FormLabel>
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
                <FormItem className="w-40">
                  <FormLabel>Level</FormLabel>
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
                              field.value?.filter((_, i) => i !== tagIndex) ||
                              [];
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
            onClick={() => fieldArray.remove(index)}
          >
            Remove Skill
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          fieldArray.append({
            name: "",
            level: "",
            tags: [],
          })
        }
      >
        Add {title.split(" ")[0]} Skill
      </Button>
    </div>
  );

  return (
    <BaseSheetComponentForEdit title={title} description={description}>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col px-2"
        >
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto space-y-8 pr-2">
            {renderSkillSection("Soft Skills", softSkillsArray, "skills.soft")}
            {renderSkillSection(
              "Technical Skills",
              technicalSkillsArray,
              "skills.technical"
            )}
          </div>

          {/* Fixed submit button at bottom */}
          <div className="flex-shrink-0 border-t bg-background p-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin mr-2" />
              )}
              Save Skills
            </Button>
          </div>
        </form>
      </Form>
    </BaseSheetComponentForEdit>
  );
}

export default SkillsEditForm;
