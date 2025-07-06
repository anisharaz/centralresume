import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Control,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface TagManagementProps<T extends FieldValues = any> {
  control: Control<T>;
  fieldName: string;
  resumeTags: string[];
  currentTag: string;
  onRemoveField?: () => void;
  removeFieldLabel?: string;
  canRemoveField?: boolean;
  tagLabel?: string;
}

export function TagManagement({
  control,
  fieldName,
  resumeTags,
  currentTag,
  onRemoveField,
  removeFieldLabel = "Remove",
  canRemoveField = true,
  tagLabel = "Tags",
}: TagManagementProps) {
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: fieldName,
  });

  const { formState } = useFormContext();
  const router = useRouter();
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-bold">{tagLabel}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {tagFields.map((tagField, tagIndex) => (
                <FormField
                  key={tagField.id}
                  control={control}
                  name={`${fieldName}.${tagIndex}.tag`}
                  render={({ field: tagInputField }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="removeTag"
                          onClick={() => removeTag(tagIndex)}
                          disabled={tagFields.length <= 1}
                        >
                          Remove tag
                        </Button>
                        <Select
                          onValueChange={tagInputField.onChange}
                          defaultValue={tagInputField.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {resumeTags.map((tag) => (
                              <SelectItem key={tag} value={tag}>
                                {tag}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                disabled={tagFields.length >= resumeTags.length}
              >
                Add Tag
              </Button>
              {tagFields.length >= resumeTags.length &&
                (formState.isDirty ? (
                  <Button
                    size="sm"
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      toast.warning("Please save the changes first", {
                        position: "top-center",
                        duration: 3000,
                      });
                    }}
                  >
                    Create new tags
                  </Button>
                ) : (
                  <Button size="sm" type="button" className="ml-2" asChild>
                    <Link href="/user/setting/tags">Create new tags</Link>
                  </Button>
                ))}
              {onRemoveField && (
                <>
                  <Separator className="my-2" />
                  <div className="flex gap-2">
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
                  </div>
                </>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
