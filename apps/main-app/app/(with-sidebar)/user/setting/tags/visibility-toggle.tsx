"use client";

import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { $Enums } from "@centralresume/database/prisma";
import { useTransition } from "react";
import { toggleTagVisibility } from "@/app/actions/resume/tag-management";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface VisibilityToggleProps {
  tagId: string;
  currentVisibility: $Enums.VISIBILITY;
}

export function VisibilityToggle({
  tagId,
  currentVisibility,
}: VisibilityToggleProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = (checked: boolean) => {
    const newVisibility = checked
      ? $Enums.VISIBILITY.PUBLIC
      : $Enums.VISIBILITY.PRIVATE;

    startTransition(async () => {
      try {
        const result = await toggleTagVisibility(tagId, newVisibility);

        if (result.success) {
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update visibility");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Badge
        variant={
          currentVisibility === $Enums.VISIBILITY.PUBLIC
            ? "default"
            : "secondary"
        }
        className="min-w-16 justify-center"
      >
        {currentVisibility === $Enums.VISIBILITY.PUBLIC ? "Public" : "Private"}
      </Badge>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Private</span>
        <Switch
          checked={currentVisibility === $Enums.VISIBILITY.PUBLIC}
          onCheckedChange={handleToggle}
          disabled={isPending}
        />
        <span className="text-sm text-muted-foreground">Public</span>
      </div>
    </div>
  );
}
