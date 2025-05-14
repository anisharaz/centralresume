"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ENGINEERING_RESUME_TYPE } from "@/lib/zod/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface OtherListsFormProps {
  form: UseFormReturn<ENGINEERING_RESUME_TYPE>;
}

export function OtherListsForm({ form }: OtherListsFormProps) {
  const [otherList, setOtherList] = useState({
    heading: "",
    headingTags: "",
    summaryText: "",
    summaryTags: "",
    tags: "",
  });

  const [currentListIndex, setCurrentListIndex] = useState<number | null>(null);

  const resetListForm = () => {
    setOtherList({
      heading: "",
      headingTags: "",
      summaryText: "",
      summaryTags: "",
      tags: "",
    });
    setCurrentListIndex(null);
  };

  const addOtherList = () => {
    if (!otherList.heading || !otherList.summaryText) return;

    const newList = {
      tags: otherList.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      heading: [
        {
          text: otherList.heading,
          tags: otherList.headingTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
      ],
      summary: [
        {
          text: otherList.summaryText,
          tags: otherList.summaryTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
      ],
    };

    const currentLists = form.getValues("otherLists") || [];

    if (currentListIndex !== null) {
      // Update existing list
      const updatedLists = [...currentLists];
      updatedLists[currentListIndex] = newList;
      form.setValue("otherLists", updatedLists);
    } else {
      // Add new list
      form.setValue("otherLists", [...currentLists, newList]);
    }

    resetListForm();
  };

  const editOtherList = (index: number) => {
    const listData = form.getValues("otherLists")?.[index];
    if (!listData) return;

    setOtherList({
      heading: listData.heading[0]?.text || "",
      headingTags: listData.heading[0]?.tags.join(", ") || "",
      summaryText: listData.summary[0]?.text || "",
      summaryTags: listData.summary[0]?.tags.join(", ") || "",
      tags: listData.tags.join(", "),
    });

    setCurrentListIndex(index);
  };

  const removeOtherList = (index: number) => {
    const currentLists = form.getValues("otherLists") || [];
    form.setValue(
      "otherLists",
      currentLists.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Other Lists</h2>
      <p className="text-muted-foreground">
        Add any other sections you&apos;d like to include in your resume, such
        as projects, volunteering, interests, etc.
      </p>

      <div className="space-y-4 border p-4 rounded-md">
        <div className="space-y-2">
          <label className="text-sm font-medium">Section Heading</label>
          <Input
            placeholder="e.g., Projects, Volunteering"
            value={otherList.heading}
            onChange={(e) =>
              setOtherList({ ...otherList, heading: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Heading Tags</label>
          <Input
            placeholder="Tags (comma separated)"
            value={otherList.headingTags}
            onChange={(e) =>
              setOtherList({ ...otherList, headingTags: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <Textarea
            placeholder="Description of this section"
            value={otherList.summaryText}
            onChange={(e) =>
              setOtherList({ ...otherList, summaryText: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content Tags</label>
          <Input
            placeholder="Tags (comma separated)"
            value={otherList.summaryTags}
            onChange={(e) =>
              setOtherList({ ...otherList, summaryTags: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Section Tags</label>
          <Input
            placeholder="Tags (comma separated)"
            value={otherList.tags}
            onChange={(e) =>
              setOtherList({ ...otherList, tags: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={addOtherList}>
            {currentListIndex !== null ? "Update Section" : "Add Section"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-md font-medium">Added Sections</h3>

        {(!form.watch("otherLists") ||
          form.watch("otherLists")?.length === 0) && (
          <p className="text-muted-foreground text-sm">
            No additional sections added yet.
          </p>
        )}

        <div className="space-y-4">
          {form.watch("otherLists")?.map((list, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{list.heading[0]?.text}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editOtherList(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeOtherList(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>{list.summary[0]?.text}</p>

                  {list.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {list.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-muted text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
