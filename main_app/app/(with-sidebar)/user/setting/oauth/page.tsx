import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CreateOauthClientForm from "./CreateOauthClientForm";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { headers } from "next/headers";
import ShowCredentials from "./show-credentials";
import { Separator } from "@/components/ui/separator";
import { Settings, ExternalLink, Edit3, Plus } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

async function OauthClientSettings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownedClients = await prisma.oauthClient.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      oauthAccessToken: {
        where: {
          userId: {
            not: session?.user.id,
          },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="container mx-auto max-w-6xl p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">My OAuth Clients</h1>
        <p className="text-muted-foreground">
          OAuth applications you've created that can access other users' data
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Settings className="h-4 w-4" />
          {ownedClients.length} client{ownedClients.length !== 1 ? "s" : ""}{" "}
          created
        </div>
        <CreateOauthClientForm />
      </div>

      <Separator />

      {/* Owned Clients List */}
      <div className="grid gap-4">
        {ownedClients.map((client) => {
          const activeConnections = client.oauthAccessToken.length;

          return (
            <Card
              key={client.clientId}
              className="transition-all hover:shadow-md"
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
                        <Settings className="h-6 w-6 text-muted-foreground" />
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
                      <CardDescription>
                        Created{" "}
                        {formatDistanceToNow(client.createdAt, {
                          addSuffix: true,
                        })}
                      </CardDescription>
                      {client.description && (
                        <p className="text-sm text-muted-foreground">
                          {client.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={activeConnections > 0 ? "default" : "secondary"}
                    >
                      {activeConnections} connection
                      {activeConnections !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm items-center">
                    <div>
                      <p className="font-medium text-muted-foreground">
                        Client ID
                      </p>
                      <code className="bg-muted px-2 py-1 rounded text-xs block mt-1 break-all">
                        {client.clientId}
                      </code>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">
                        Redirect URI
                      </p>
                      <p className="text-xs text-muted-foreground break-all">
                        {client.redirect_uri}
                      </p>
                    </div>
                  </div>

                  {activeConnections > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">
                        Recent Connections
                      </p>
                      <div className="space-y-2">
                        {client.oauthAccessToken.slice(0, 3).map((token) => (
                          <div
                            key={token.id}
                            className="flex items-center justify-between bg-muted/50 p-2 rounded"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium">
                                  {token.user.name?.charAt(0) || "U"}
                                </span>
                              </div>
                              <span className="text-sm">
                                {token.user.name || token.user.email}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(token.createdAt, {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-end space-x-2">
                <ShowCredentials
                  clientId={client.clientId}
                  clientSecret={client.clientSecret}
                />
              </CardFooter>
            </Card>
          );
        })}

        {/* Empty State for Owned Clients */}
        {ownedClients.length === 0 && (
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Settings className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">
                  No OAuth Clients Created
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  You haven't created any OAuth applications yet. Create one to
                  allow other applications to access user resume data through
                  your API.
                </p>
              </div>
              <CreateOauthClientForm />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default OauthClientSettings;
