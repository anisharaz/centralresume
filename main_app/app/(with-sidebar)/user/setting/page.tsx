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
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Globe,
  Shield,
  Trash2,
  ExternalLink,
  Eye,
  Clock,
  Link2,
  User,
} from "lucide-react";
import Image from "next/image";
import { auth } from "@/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import CreateResumeLink from "./create-resume-link";
import ResumeLinkCard from "./resume-link-card";
import CreateProfileLink from "./create-profile-link";
import ProfileLinkCard from "./profile-link-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function UserSettings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const activeTokens = await prisma.oauthAccessToken.findMany({
    where: {
      userId: session?.session.userId,
    },
    include: {
      oauthClient: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  // Fetch resume links
  const resumeLinks = await prisma.resumeLink.findMany({
    where: {
      userId: session?.session.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Fetch profile links
  const profileLinks = await prisma.profileLink.findMany({
    where: {
      userId: session?.session.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Fetch available resume tags
  const resumeTags = await prisma.resumeTags.findMany({
    where: {
      userId: session?.session.userId,
    },
    select: {
      resumeTagName: true,
    },
    orderBy: {
      resumeTagName: "asc",
    },
  });

  return (
    <div className="container mx-auto max-w-6xl p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          User & Profile Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account, profile, and essential settings
        </p>
      </div>
      <Separator />
      {/* Profile Links Section */}
      <div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Profile Links</h2>
              <p className="text-sm text-muted-foreground">
                Create and manage shareable links for your profile with specific
                tags
              </p>
            </div>
            <div className="flex items-center gap-4">
              {profileLinks.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {profileLinks.length} active link
                  {profileLinks.length !== 1 ? "s" : ""}
                </div>
              )}
              <CreateProfileLink resumeTags={resumeTags} />
            </div>
          </div>

          {/* Profile Links List */}
          <div className="grid gap-4">
            <ScrollArea className="max-h-[70vh]">
              <div className="flex flex-col gap-4">
                {profileLinks.map((link) => (
                  <ProfileLinkCard key={link.id} link={link} />
                ))}
              </div>
            </ScrollArea>

            {/* Empty State for Profile Links */}
            {profileLinks.length === 0 && (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">No Profile Links</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      You haven&apos;t created any shareable profile links yet.
                      Create links to share your profile with specific tag
                      filters.
                    </p>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Each link can target a specific resume tag for customized
                      profile viewing
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Separator />
      {/* Resume Links Section */}
      <div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Resume Links</h2>
              <p className="text-sm text-muted-foreground">
                Create and manage shareable links for your resume with specific
                tags
              </p>
            </div>
            <div className="flex items-center gap-4">
              {resumeLinks.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link2 className="h-4 w-4" />
                  {resumeLinks.length} active link
                  {resumeLinks.length !== 1 ? "s" : ""}
                </div>
              )}
              <CreateResumeLink resumeTags={resumeTags} />
            </div>
          </div>

          {/* Resume Links List */}
          <div className="grid gap-4">
            <ScrollArea className="max-h-[70vh]">
              <div className="flex flex-col gap-4">
                {resumeLinks.map((link) => (
                  <ResumeLinkCard key={link.id} link={link} />
                ))}
              </div>
            </ScrollArea>

            {/* Empty State for Resume Links */}
            {resumeLinks.length === 0 && (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Link2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">No Resume Links</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      You haven&apos;t created any shareable resume links yet.
                      Create links to share your resume with specific tag
                      filters.
                    </p>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Each link can target a specific resume tag for customized
                      viewing
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Separator />
      {/* Applications with Access Section */}
      <div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">
                Applications with Access
              </h2>
              <p className="text-sm text-muted-foreground">
                These applications currently have access to your resume data
              </p>
            </div>
            {activeTokens.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                {activeTokens.length} active connection
                {activeTokens.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Connected Apps List */}
          <div className="grid gap-4">
            {activeTokens.map((token) => {
              const client = token.oauthClient;
              const scopes = token.scope.split(" ").filter(Boolean);
              const lastAccessed = formatDistanceToNow(token.updatedAt, {
                addSuffix: true,
              });

              return (
                <Card
                  key={token.id}
                  className="transition-all hover:shadow-md border-l-4 border-l-primary/20"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 rounded-lg border bg-muted p-2 flex items-center justify-center">
                          {client.image ? (
                            <Image
                              src={client.image}
                              fill
                              alt={`${client.name} logo`}
                              className="rounded-md object-cover"
                            />
                          ) : (
                            <Globe className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {client.name}
                            {client.website && (
                              <a
                                href={client.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Last accessed {lastAccessed}
                          </CardDescription>
                          {client.description && (
                            <p className="text-sm text-muted-foreground">
                              {client.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="capitalize">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Access Permissions
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {scopes.map((scope, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              #{scope}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>
                            Connected:{" "}
                            {formatDistanceToNow(token.createdAt, {
                              addSuffix: true,
                            })}
                          </p>
                          <p>
                            Client ID:{" "}
                            <code className="bg-muted px-1 rounded">
                              {client.clientId}
                            </code>
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Revoke
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <AlertTriangle className="h-5 w-5 text-destructive" />
                                  Revoke Access for {client.name}
                                </DialogTitle>
                                <DialogDescription className="space-y-2">
                                  <p>
                                    Are you sure you want to revoke access for{" "}
                                    <strong>{client.name}</strong>?
                                  </p>
                                  <p className="text-sm">
                                    This will immediately stop the application
                                    from accessing your resume data. The
                                    application will need to request
                                    authorization again to regain access.
                                  </p>
                                  <div className="bg-muted p-3 rounded-md">
                                    <p className="text-xs font-medium">
                                      Current permissions:
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {scopes.map((scope, index) => (
                                        <Badge
                                          key={index}
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          #{scope}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline">Cancel</Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  disabled
                                >
                                  Revoke Access (Coming Soon)
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
            })}

            {/* Empty State for Connected Apps */}
            {activeTokens.length === 0 && (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Shield className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">
                      No Connected Applications
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      You haven&apos;t authorized any applications to access
                      your resume data yet. When you do, they&apos;ll appear
                      here and you can manage their permissions.
                    </p>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Applications will request access through OAuth when you
                      use them
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
