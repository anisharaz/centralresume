"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ENGINEERING_RESUME_TYPE } from "@/lib/zod/schemas";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface PersonalDetailsFormProps {
  form: UseFormReturn<ENGINEERING_RESUME_TYPE>;
}

export function PersonalDetailsForm({ form }: PersonalDetailsFormProps) {
  const [tagLineText, setTagLineText] = useState("");
  const [tagLineTags, setTagLineTags] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const [summaryTags, setSummaryTags] = useState("");
  const [socialName, setSocialName] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [socialTags, setSocialTags] = useState("");

  const addTagLine = () => {
    if (!tagLineText) return;

    const currentTagLines = form.getValues("personal_details.tag_line") || [];
    form.setValue("personal_details.tag_line", [
      ...currentTagLines,
      {
        text: tagLineText,
        tags: tagLineTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      },
    ]);

    setTagLineText("");
    setTagLineTags("");
  };

  const removeTagLine = (index: number) => {
    const currentTagLines = form.getValues("personal_details.tag_line") || [];
    form.setValue(
      "personal_details.tag_line",
      currentTagLines.filter((_, i) => i !== index)
    );
  };

  const addSummary = () => {
    if (!summaryText) return;

    const currentSummaries = form.getValues("personal_details.summary") || [];
    form.setValue("personal_details.summary", [
      ...currentSummaries,
      {
        text: summaryText,
        tags: summaryTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      },
    ]);

    setSummaryText("");
    setSummaryTags("");
  };

  const removeSummary = (index: number) => {
    const currentSummaries = form.getValues("personal_details.summary") || [];
    form.setValue(
      "personal_details.summary",
      currentSummaries.filter((_, i) => i !== index)
    );
  };

  const addSocialLink = () => {
    if (!socialName || !socialUrl) return;

    const currentLinks = form.getValues("personal_details.social_links") || [];
    form.setValue("personal_details.social_links", [
      ...currentLinks,
      {
        name: socialName,
        url: socialUrl,
        tags: socialTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      },
    ]);

    setSocialName("");
    setSocialUrl("");
    setSocialTags("");
  };

  const removeSocialLink = (index: number) => {
    const currentLinks = form.getValues("personal_details.social_links") || [];
    form.setValue(
      "personal_details.social_links",
      currentLinks.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Basic Details</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-left underline underline-offset-4">
          Profile
        </h3>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="personal_details.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Full Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personal_details.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="personal_details.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="+1 (555) 123-4567" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator className="my-4" />
      <div className="space-y-4">
        <h3 className="text-md font-bold text-left underline underline-offset-4">
          Tag Lines
        </h3>
        <div className="flex gap-2">
          <Input
            placeholder="Tag line text"
            value={tagLineText}
            onChange={(e) => setTagLineText(e.target.value)}
          />
          <Input
            placeholder="Tags (comma separated)"
            value={tagLineTags}
            onChange={(e) => setTagLineTags(e.target.value)}
          />
          <Button type="button" variant="outline" onClick={addTagLine}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {form.watch("personal_details.tag_line")?.map((tagLine, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <div>
                <p>{tagLine.text}</p>
                <div className="flex gap-1 mt-1">
                  {tagLine.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-muted text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeTagLine(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-left underline underline-offset-4">
          Summery
        </h3>

        <div className="flex gap-2">
          <Input
            placeholder="Summary text"
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
          />
          <Input
            placeholder="Tags (comma separated)"
            value={summaryTags}
            onChange={(e) => setSummaryTags(e.target.value)}
          />
          <Button type="button" variant="outline" onClick={addSummary}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {form.watch("personal_details.summary")?.map((summary, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <div>
                <p>{summary.text}</p>
                <div className="flex gap-1 mt-1">
                  {summary.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-muted text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSummary(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-left underline underline-offset-4">
          Address
        </h3>
        <FormField
          control={form.control}
          name="personal_details.address.address_line"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="personal_details.address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personal_details.address.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="United States" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-left underline underline-offset-4">
          Social Links
        </h3>

        <div className="flex gap-2">
          <Input
            placeholder="Platform (e.g., LinkedIn)"
            value={socialName}
            onChange={(e) => setSocialName(e.target.value)}
          />
          <Input
            placeholder="URL"
            value={socialUrl}
            onChange={(e) => setSocialUrl(e.target.value)}
          />
          <Input
            placeholder="Tags (comma separated)"
            value={socialTags}
            onChange={(e) => setSocialTags(e.target.value)}
          />
          <Button type="button" variant="outline" onClick={addSocialLink}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {form.watch("personal_details.social_links")?.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <div>
                <p className="font-medium">{link.name}</p>
                <p className="text-sm text-muted-foreground">{link.url}</p>
                <div className="flex gap-1 mt-1">
                  {link.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-muted text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSocialLink(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
