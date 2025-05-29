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
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl flex gap-5">
            <div>Additional Information</div>
            <div>{children}</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-2">
          {!data || data.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No additional information added yet.
            </p>
          ) : null}
          {data.map((list, index) => (
            <div
              key={index}
              className="border border-neutral-600 p-3 rounded-md"
            >
              <div className="space-y-4">
                {/* Section Header */}
                <div className="space-y-3">
                  {list.heading && list.heading.length > 0 && (
                    <div className="flex items-center gap-3">
                      <Folder className="h-5 w-5 text-muted-foreground" />
                      <div className="flex flex-wrap gap-2">
                        {list.heading.map((heading, headingIndex) => (
                          <h2
                            key={headingIndex}
                            className="text-2xl font-semibold"
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
                  <div className="ml-8 space-y-3">
                    <div className="space-y-3">
                      {list.summary.map((item, summaryIndex) => (
                        <div
                          key={summaryIndex}
                          className="flex items-start gap-3"
                        >
                          <List className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                          <p className="text-muted-foreground leading-relaxed">
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
