import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, ExternalLink, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDataType } from "@/lib/types";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

type Publications = ResumeDataType["publications"];

export function PublicationsSectionView({
  data,
  children,
}: {
  data: Publications;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto">
      <Card className="border-0 shadow-md bg-gradient-to-br from-background to-muted/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-3xl lg:text-4xl font-bold tracking-tight flex flex-col lg:flex-row lg:items-center gap-3">
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Publications
            </span>
            <div className="flex items-center">{children}</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {!data || data.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No publications added yet.
            </p>
          ) : null}
          {data.map((publication, index) => (
            <div
              key={index}
              className="border border-muted/40 bg-background/40 backdrop-blur-sm rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Publication Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 mt-0.5">
                        <BookOpen className="h-3 w-3 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold leading-tight">
                        {publication.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 ml-8">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                        <Building className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border-primary/20"
                      >
                        {publication.publisher}
                      </Badge>
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-auto px-2.5 py-1.5 border-muted/40 bg-background/40 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
                    >
                      <Link
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5"
                      >
                        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10">
                          <ExternalLink className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span className="text-xs font-medium">
                          View Publication
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Release Date - Inline compact */}
                <div className="ml-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background/60 border border-muted/40 rounded-lg">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                      <Calendar className="h-2.5 w-2.5 text-primary" />
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Published:</span>
                      <span className="font-medium ml-1">
                        {formatDate(publication.releaseDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                {publication.summary && publication.summary.length > 0 && (
                  <div className="ml-8 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-4 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                      <h3 className="text-sm font-semibold">Summary</h3>
                    </div>
                    <div className="space-y-1.5">
                      {publication.summary.map((item, summaryIndex) => (
                        <p
                          key={summaryIndex}
                          className="text-muted-foreground leading-relaxed text-sm"
                        >
                          {item.text}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
