import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, Folder } from "lucide-react";
import { ResumeDataType } from "@/lib/types";
import { DUMMY_MODE } from "@/lib/vars";

type OtherLists = ResumeDataType["otherLists"];

export function OtherListsCard({ data }: { data: OtherLists }) {
  if (DUMMY_MODE) {
    data = [
      {
        heading: [{ text: "Open Source Projects" }],
        summary: [
          {
            text: "Maintainer of a popular TypeScript utility library with over 2,000 stars on GitHub.",
          },
          {
            text: "Contributor to React ecosystem packages with cumulative downloads exceeding 100K monthly.",
          },
          {
            text: "Created developer tools that improved workflow efficiency for teams across multiple organizations.",
          },
        ],
      },
      {
        heading: [{ text: "Professional Certifications" }],
        summary: [
          {
            text: "AWS Certified Solutions Architect – Associate (Valid until 2026)",
          },
          { text: "Google Cloud Professional Developer Certificate" },
          { text: "Microsoft Azure Fundamentals (AZ-900)" },
          { text: "Kubernetes Application Developer (CKAD)" },
        ],
      },
      {
        heading: [{ text: "Notable Projects" }],
        summary: [
          {
            text: "E-commerce Platform: Built a full-stack e-commerce solution serving 10,000+ users with real-time inventory management.",
          },
          {
            text: "AI Content Generator: Developed a machine learning-powered content creation tool that increased team productivity by 60%.",
          },
          {
            text: "Mobile Banking App: Led development of a secure banking application with biometric authentication and real-time transactions.",
          },
        ],
      },
      {
        heading: [{ text: "Professional Development" }],
        summary: [
          {
            text: "Advanced React Patterns and Performance Optimization (2023)",
          },
          { text: "Microservices Architecture Design Workshop (2022)" },
          { text: "Leadership in Tech: Managing Engineering Teams (2022)" },
          { text: "Machine Learning for Web Developers Bootcamp (2021)" },
        ],
      },
    ];
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              No additional information added yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Additional Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-2">
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
