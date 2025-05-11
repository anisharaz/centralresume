"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ENGINEERING_RESUME_TYPE } from "@/lib/zod/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface PublicationsFormProps {
  form: UseFormReturn<ENGINEERING_RESUME_TYPE>;
}

export function PublicationsForm({ form }: PublicationsFormProps) {
  const [publication, setPublication] = useState({
    name: "",
    tags: "",
    publisher: "",
    releaseDate: "",
    url: "",
    summaryText: "",
    summaryTags: "",
  });

  const [currentPublicationIndex, setCurrentPublicationIndex] = useState<
    number | null
  >(null);

  const resetPublicationForm = () => {
    setPublication({
      name: "",
      tags: "",
      publisher: "",
      releaseDate: "",
      url: "",
      summaryText: "",
      summaryTags: "",
    });
    setCurrentPublicationIndex(null);
  };

  const addPublication = () => {
    if (
      !publication.name ||
      !publication.publisher ||
      !publication.releaseDate ||
      !publication.url
    )
      return;

    const newPublication = {
      name: publication.name,
      tags: publication.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      publisher: publication.publisher,
      releaseDate: new Date(publication.releaseDate),
      url: publication.url,
      summary: publication.summaryText
        ? [
            {
              text: publication.summaryText,
              tags: publication.summaryTags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            },
          ]
        : undefined,
    };

    const currentPublications = form.getValues("publications") || [];

    if (currentPublicationIndex !== null) {
      // Update existing publication
      const updatedPublications = [...currentPublications];
      updatedPublications[currentPublicationIndex] = newPublication;
      form.setValue("publications", updatedPublications);
    } else {
      // Add new publication
      form.setValue("publications", [...currentPublications, newPublication]);
    }

    resetPublicationForm();
  };

  const editPublication = (index: number) => {
    const publicationData = form.getValues("publications")?.[index];
    if (!publicationData) return;

    setPublication({
      name: publicationData.name,
      tags: publicationData.tags.join(", "),
      publisher: publicationData.publisher,
      releaseDate: publicationData.releaseDate.toISOString().split("T")[0],
      url: publicationData.url,
      summaryText: publicationData.summary?.[0]?.text || "",
      summaryTags: publicationData.summary?.[0]?.tags.join(", ") || "",
    });

    setCurrentPublicationIndex(index);
  };

  const removePublication = (index: number) => {
    const currentPublications = form.getValues("publications") || [];
    form.setValue(
      "publications",
      currentPublications.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Publications</h2>

      <div className="space-y-4 border p-4 rounded-md">
        <div className="space-y-2">
          <label className="text-sm font-medium">Publication Title</label>
          <Input
            placeholder="e.g., Advanced Machine Learning Techniques"
            value={publication.name}
            onChange={(e) =>
              setPublication({ ...publication, name: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>
          <Input
            placeholder="Tags (comma separated)"
            value={publication.tags}
            onChange={(e) =>
              setPublication({ ...publication, tags: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Publisher</label>
          <Input
            placeholder="e.g., IEEE, ACM"
            value={publication.publisher}
            onChange={(e) =>
              setPublication({ ...publication, publisher: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Release Date</label>
          <Input
            type="date"
            value={publication.releaseDate}
            onChange={(e) =>
              setPublication({ ...publication, releaseDate: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">URL</label>
          <Input
            placeholder="https://example.com/publication"
            value={publication.url}
            onChange={(e) =>
              setPublication({ ...publication, url: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Summary (Optional)</label>
          <Textarea
            placeholder="Brief description of the publication"
            value={publication.summaryText}
            onChange={(e) =>
              setPublication({ ...publication, summaryText: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Summary Tags</label>
          <Input
            placeholder="Tags (comma separated)"
            value={publication.summaryTags}
            onChange={(e) =>
              setPublication({ ...publication, summaryTags: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={addPublication}>
            {currentPublicationIndex !== null
              ? "Update Publication"
              : "Add Publication"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-md font-medium">Added Publications</h3>

        {(!form.watch("publications") ||
          form.watch("publications")?.length === 0) && (
          <p className="text-muted-foreground text-sm">
            No publications added yet.
          </p>
        )}

        <div className="space-y-4">
          {form.watch("publications")?.map((publication, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{publication.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editPublication(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removePublication(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {publication.publisher} •{" "}
                    {new Date(publication.releaseDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {publication.url}
                    </a>
                  </p>

                  {publication.summary && publication.summary[0]?.text && (
                    <p>{publication.summary[0].text}</p>
                  )}

                  {publication.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {publication.tags.map((tag, tagIndex) => (
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
