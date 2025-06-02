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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit3, Loader2 } from "lucide-react";
import { updateBannerText } from "@/app/actions/profile/profile-links";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BannerTextEditProps {
  currentBannerText: string;
}

export default function BannerTextEdit({
  currentBannerText,
}: BannerTextEditProps) {
  const [open, setOpen] = useState(false);
  const [bannerText, setBannerText] = useState(currentBannerText);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    if (!bannerText.trim()) {
      toast.error("Banner text cannot be empty");
      return;
    }

    setIsUpdating(true);
    try {
      const result = await updateBannerText(bannerText);

      if (result.success) {
        toast.success("Banner text updated successfully!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update banner text");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setBannerText(currentBannerText); // Reset to original value
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-slate-600 dark:text-slate-300 hover:text-slate-800 border border-white bg-neutral-600 dark:hover:text-slate-100"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Banner Text</DialogTitle>
          <DialogDescription>
            Update the banner text that appears on your profile page.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="bannerText">Banner Text</Label>
            <Input
              id="bannerText"
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              placeholder="Enter your banner text..."
              maxLength={60}
              disabled={isUpdating}
            />
            <p className="text-xs text-muted-foreground">
              {bannerText.length}/60 characters
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={isUpdating || !bannerText.trim()}
          >
            {isUpdating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isUpdating ? "Updating..." : "Update Banner"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
