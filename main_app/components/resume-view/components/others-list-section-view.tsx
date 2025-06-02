import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, Folder } from "lucide-react";
import { ResumeDataType } from "@/lib/types";

type OtherLists = ResumeDataType["otherLists"];

export function OtherListsSectionView({
  data,
  children,
}: {
  data: OtherLists;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto">
      <Card className="border-0 shadow-md bg-gradient-to-br from-background to-muted/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-3xl lg:text-4xl font-bold tracking-tight flex flex-col lg:flex-row lg:items-center gap-3">
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Additional Information
            </span>
            <div className="flex items-center">{children}</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {!data || data.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No additional information added yet.
            </p>
          ) : null}
          {data.map((list, index) => (
            <div
              key={index}
              className="border border-muted/40 bg-background/40 backdrop-blur-sm rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Section Header */}
                <div className="space-y-2">
                  {list.heading && list.heading.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                        <Folder className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {list.heading.map((heading, headingIndex) => (
                          <h2
                            key={headingIndex}
                            className="text-xl font-semibold"
                          >
                            {heading.text}
                          </h2>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content List */}
                {list.summary && list.summary.length > 0 && (
                  <div className="ml-8 space-y-2">
                    <div className="space-y-2">
                      {list.summary.map((item, summaryIndex) => (
                        <div
                          key={summaryIndex}
                          className="flex items-start gap-2"
                        >
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 mt-0.5">
                            <List className="h-2.5 w-2.5 text-primary" />
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {item.text}
                          </p>
                        </div>
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
