import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Control, FieldValues, useFieldArray } from "react-hook-form";

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
                Add Tag
              </Button>
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
