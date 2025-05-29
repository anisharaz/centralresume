import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, ExternalLink, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDataType } from "@/lib/types";
import Link from "next/link";

type Publications = ResumeDataType["publications"];

export function PublicationsSectionView({
  data,
  children,
}: {
  data: Publications;
  children?: React.ReactNode;
}) {
  const formatDate = (dateString: Date) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString.toString();
    }
  };

  return (
    <div className="w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl flex gap-5">
            <div>Publication</div>
            <div>{children}</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-2">
          {!data || data.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No publications added yet.
            </p>
          ) : null}
          {data.map((publication, index) => (
            <div
              key={index}
              className="border border-neutral-600 p-3 rounded-md"
            >
              <div className="space-y-4">
                {/* Publication Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-muted-foreground mt-1" />
                      <h2 className="text-2xl font-semibold leading-tight">
                        {publication.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 ml-8">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="secondary" className="text-sm">
                        {publication.publisher}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 lg:text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm">View Publication</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Release Date */}
                <div className="ml-8 space-y-2">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Publication Date
                          </p>
                          <p className="font-medium">
                            {formatDate(publication.releaseDate)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary */}
                {publication.summary && publication.summary.length > 0 && (
                  <div className="ml-8 space-y-3">
                    <h3 className="text-lg font-medium">Summary</h3>
                    <div className="space-y-2">
                      {publication.summary.map((item, summaryIndex) => (
                        <p
                          key={summaryIndex}
                          className="text-muted-foreground leading-relaxed"
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
