"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { createResumeLink } from "@/app/actions/resume/resume-links";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { $Enums } from "@prisma/client";

interface CreateResumeLinkProps {
  resumeTags: { resumeTagName: string }[];
}

export default function CreateResumeLink({
  resumeTags,
}: CreateResumeLinkProps) {
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [visibility, setVisibility] = useState<$Enums.VISIBILITY>("PUBLIC");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreateLink = async () => {
    if (!selectedTag) {
      toast.error("Please select a resume tag");
      return;
    }

    setIsCreating(true);
    try {
      const result = await createResumeLink({
        tag: selectedTag,
        visibility: visibility,
      });

      if (result.success) {
        toast.success("Resume link created successfully!");
        setOpen(false);
        setSelectedTag("");
        setVisibility("PUBLIC");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to create resume link");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 text-xs sm:text-sm">
          <Plus className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Create Link</span>
          <span className="sm:hidden">Create</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Create Resume Link
          </DialogTitle>
          <DialogDescription className="text-sm">
            Create a shareable link for your resume with a specific tag filter.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Resume Tag</label>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a tag..." />
              </SelectTrigger>
              <SelectContent>
                {resumeTags.map((tag) => (
                  <SelectItem key={tag.resumeTagName} value={tag.resumeTagName}>
                    {tag.resumeTagName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Visibility</label>
            <Select
              value={visibility}
              onValueChange={(value: $Enums.VISIBILITY) => setVisibility(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLIC">Public</SelectItem>
                <SelectItem value="PRIVATE">Private</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Public links can be accessed by anyone with the URL. Private links
              require authentication.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="text-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateLink}
            disabled={isCreating || !selectedTag}
            className="text-sm"
          >
            {isCreating ? "Creating..." : "Create Link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
