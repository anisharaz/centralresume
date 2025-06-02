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
    process.env.NEXT_PUBLIC_APP_URL || "https://app.centralresume.com"
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
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative h-10 w-10 rounded-lg border bg-muted p-2 flex items-center justify-center">
              <Link2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-base flex items-center gap-2">
                Resume Link - {link.resumeTagName}
                <Badge
                  variant={
                    currentVisibility === "PUBLIC" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {currentVisibility}
                </Badge>
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Created {createdAgo}
              </CardDescription>
            </div>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleVisibility}
              disabled={isTogglingVisibility}
              className="h-8 px-3 text-muted-foreground hover:text-foreground"
            >
              {isTogglingVisibility ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : currentVisibility === "PUBLIC" ? (
                <Globe className="h-3 w-3 mr-1" />
              ) : (
                <Lock className="h-3 w-3 mr-1" />
              )}
              {isTogglingVisibility
                ? "Updating..."
                : currentVisibility === "PUBLIC"
                ? "Make Private"
                : "Make Public"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Shareable URL</p>
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
              <code className="text-xs flex-1 truncate">{linkUrl}</code>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
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

          <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8" asChild>
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
                    className="h-8 px-3 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Delete Resume Link
                    </DialogTitle>
                    <DialogDescription className="space-y-2">
                      <p>
                        Are you sure you want to delete this resume link for{" "}
                        <strong>{link.resumeTagName}</strong>?
                      </p>
                      <p className="text-sm">
                        This action cannot be undone. The link will no longer be
                        accessible.
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={isDeleting}
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
