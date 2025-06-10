"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Trash2,
  ExternalLink,
  Clock,
  Link2,
  Copy,
  CheckCircle,
  Globe,
  Lock,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  deleteResumeLink,
  toggleResumeLinkVisibility,
} from "@/app/actions/resume/resume-links";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ResumeLinkCardProps {
  link: {
    id: string;
    linkId: string;
    resumeTagName: string;
    visibility: "PUBLIC" | "PRIVATE";
    createdAt: Date;
  };
}

export default function ResumeLinkCard({ link }: ResumeLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingVisibility, setIsTogglingVisibility] = useState(false);
  const [currentVisibility, setCurrentVisibility] = useState(link.visibility);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const linkUrl = `${
    process.env.NEXT_PUBLIC_APP_URL || "https://centralresume.me"
  }/resume?linkId=${link.linkId}&resumeTag=${link.resumeTagName}`;
  const createdAgo = formatDistanceToNow(link.createdAt, { addSuffix: true });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteResumeLink(link.id);
      if (result.success) {
        toast.success("Resume link deleted successfully!");
        setDeleteDialogOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete resume link");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleVisibility = async () => {
    const newVisibility = currentVisibility === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    setIsTogglingVisibility(true);

    try {
      const result = await toggleResumeLinkVisibility(link.id, newVisibility);
      if (result.success) {
        setCurrentVisibility(newVisibility);
        toast.success(`Resume link is now ${newVisibility.toLowerCase()}`);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update visibility");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsTogglingVisibility(false);
    }
  };

  return (
    <Card className="transition-all hover:shadow-md border-l-4 border-l-secondary/20">
      <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative h-6 w-6 sm:h-10 sm:w-10 rounded-lg border bg-muted p-1 sm:p-2 flex items-center justify-center flex-shrink-0">
              <Link2 className="h-3 w-3 sm:h-5 sm:w-5 text-muted-foreground" />
            </div>
            <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
              <CardTitle className="text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="truncate text-sm sm:text-base">
                  Resume Link - {link.resumeTagName}
                </span>
                <Badge
                  variant={
                    currentVisibility === "PUBLIC" ? "default" : "secondary"
                  }
                  className="text-xs self-start sm:self-auto py-0 px-1.5 sm:px-2"
                >
                  {currentVisibility}
                </Badge>
              </CardTitle>
              <CardDescription className="flex items-center gap-1 sm:gap-2 text-xs">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Created {createdAgo}</span>
              </CardDescription>
            </div>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleVisibility}
              disabled={isTogglingVisibility}
              className="h-7 sm:h-8 px-2 sm:px-3 text-xs text-muted-foreground hover:text-foreground"
            >
              {isTogglingVisibility ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : currentVisibility === "PUBLIC" ? (
                <Globe className="h-3 w-3 mr-1" />
              ) : (
                <Lock className="h-3 w-3 mr-1" />
              )}
              <span className="hidden sm:inline">
                {isTogglingVisibility
                  ? "Updating..."
                  : currentVisibility === "PUBLIC"
                  ? "Make Private"
                  : "Make Public"}
              </span>
              <span className="sm:hidden">
                {isTogglingVisibility
                  ? "..."
                  : currentVisibility === "PUBLIC"
                  ? "Private"
                  : "Public"}
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1.5 sm:space-y-2">
            <p className="text-xs font-medium">Shareable URL</p>
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
              <code className="text-xs flex-1 break-all overflow-wrap-anywhere min-w-0">
                {linkUrl}
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 flex-shrink-0"
                onClick={handleCopy}
              >
                {copied ? (
                  <CheckCircle className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-2 border-t gap-2 sm:gap-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 sm:h-8 text-xs px-2 sm:px-3"
                asChild
              >
                <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </a>
              </Button>
            </div>
            <div className="flex gap-2">
              <Dialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 sm:h-8 px-2 sm:px-3 text-destructive hover:text-destructive text-xs"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-lg mx-4">
                  <DialogHeader>
                    <DialogTitle className="flex items-start gap-2 text-sm sm:text-base">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="break-words">Delete Resume Link</span>
                    </DialogTitle>
                    <DialogDescription className="space-y-2 text-xs sm:text-sm">
                      <p>
                        Are you sure you want to delete this resume link for{" "}
                        <strong>{link.resumeTagName}</strong>?
                      </p>
                      <p>
                        This action cannot be undone. The link will no longer be
                        accessible.
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(false)}
                      className="text-xs sm:text-sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="text-xs sm:text-sm"
                    >
                      {isDeleting ? "Deleting..." : "Delete Link"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
