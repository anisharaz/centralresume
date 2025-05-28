import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDataType } from "@/lib/types";
import Link from "next/link";

type WorkExperience = ResumeDataType["work_experience"];

export function WorkExperienceCard({ data }: { data: WorkExperience }) {
  // Example data for demonstration purposes
  data = [
    {
      company: "TechCorp Inc.",
      position: [
        { text: "Software Engineer" },
        { text: "Team Lead" }
      ],
      website: "https://techcorp.com",
      start_date: new Date("2020-01-15"),
      end_date: new Date("2023-05-28"),
      summary: [
        { text: "Developed scalable web applications using React and Node.js." },
        { text: "Led a team of 5 engineers to deliver high-quality software solutions." }
      ],
      highlights: [
        { text: ["Implemented CI/CD pipelines to improve deployment efficiency.", "Optimized database queries, reducing response time by 30%."] }
      ]
    },
    {
      company: "Innovatech Solutions",
      position: [
        { text: "Junior Developer" }
      ],
      website: "https://innovatech.com",
      start_date: new Date("2018-06-01"),
      end_date: new Date("2019-12-31"),
      summary: [
        { text: "Assisted in the development of internal tools and dashboards." },
        { text: "Collaborated with cross-functional teams to gather requirements." }
      ],
      highlights: [
        { text: ["Contributed to open-source projects, enhancing company visibility.", "Automated repetitive tasks, saving 10+ hours weekly."] }
      ]
    }
  ];

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
          <CardTitle className="text-4xl">Work Experience</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {data && data.length > 0 ? (
            data.map((experience, index) => (
              <div key={index} className="space-y-4 border border-neutral-500 p-4 rounded-md">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{experience.company}</h2>
                  <div className="flex flex-wrap gap-2">
                    {experience.position.map((pos, posIndex) => (
                      <Badge key={posIndex} variant="secondary">
                        {pos.text}
                      </Badge>
                    ))}
                  </div>
                </div>

                {experience.website && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      href={experience.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm">{experience.website}</span>
                    </Link>
                  </Button>
                )}

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Start Date: {formatDate(experience.start_date)}
                  </p>
                  {experience.end_date && (
                    <p className="text-sm text-muted-foreground">
                      End Date: {formatDate(experience.end_date)}
                    </p>
                  )}
                </div>

                {experience.summary && experience.summary.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-md font-medium">Summary</h3>
                    {experience.summary.map((item, summaryIndex) => (
                      <p
                        key={summaryIndex}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {item.text}
                      </p>
                    ))}
                  </div>
                )}

                {experience.highlights && experience.highlights.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-md font-medium">Highlights</h3>
                    {experience.highlights.map((highlight, highlightIndex) => (
                      <ul key={highlightIndex} className="list-disc pl-5">
                        {highlight.text.map((text, textIndex) => (
                          <li key={textIndex}>{text}</li>
                        ))}
                      </ul>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              No work experience added yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}