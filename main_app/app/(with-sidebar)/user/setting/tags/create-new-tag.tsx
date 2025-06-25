"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { createTag } from "@/app/actions/resume/tag-management";
import { toast } from "sonner";
import { $Enums } from "@prisma/client";
import { useRouter } from "next/navigation";

const createTagSchema = z.object({
  fromTag: z.string(),
  newTagName: z
    .string()
    .startsWith("#")
    .min(2, "Tag must start with # and be at least 1 characters long"),
  visibility: z.nativeEnum($Enums.VISIBILITY),
});

type CreateTagForm = z.infer<typeof createTagSchema>;

function CreateNewTag({
  existingTags = [],
}: {
  existingTags: {
    id: string;
    resumeTagName: string;
    visibility: $Enums.VISIBILITY | null;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router  = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateTagForm>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      newTagName: "",
      visibility: $Enums.VISIBILITY.PRIVATE,
    },
    mode: "all",
  });

  const onSubmit = (data: CreateTagForm) => {
    startTransition(async () => {
      try {
        const result = await createTag({
          fromTag: data.fromTag,
          newTagName: data.newTagName,
          visibility: data.visibility,
        });

        if (result.success) {
          toast.success(result.message || "Tag created successfully");
          form.reset();
          setIsOpen(false);
          router.refresh(); 
        } else {
          toast.error(result.error || "Failed to create tag");
          form.setError("root", {
            type: "manual",
            message: result.error as string,
          });
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    });
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-fit">
        <Plus className="w-4 h-4" />
        Create New Tag
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Tag</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fromTag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From tag</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tag to copy from (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {existingTags.length > 0 ? (
                        existingTags.map((tag) => (
                          <SelectItem key={tag.id} value={tag.resumeTagName}>
                            {tag.resumeTagName}
                            {tag.visibility && ` (${tag.visibility.toLowerCase()})`}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          No existing tags available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newTagName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New tag name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tag name (e.g., devops, frontend, backend)"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root &&
            form.formState.errors.root.message ? (
              <FormMessage>{form.formState.errors.root.message}</FormMessage>
            ) : null}
            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {isPending ? "Creating..." : "Create Tag"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
                disabled={isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateNewTag;
