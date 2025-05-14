"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ENGINEERING_RESUME_TYPE } from "@/lib/zod/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReviewFormProps {
  form: UseFormReturn<ENGINEERING_RESUME_TYPE>;
}

export function ReviewForm({ form }: ReviewFormProps) {
  // Use form.watch() to get the current form values
  const personalDetails = form.watch("personal_details");
  const workExperience = form.watch("work_experience") || [];
  const skills = form.watch("skills");
  const achievements = form.watch("achievements") || [];
  const education = form.watch("education") || [];
  const publications = form.watch("publications") || [];
  const otherLists = form.watch("otherLists") || [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Review Your Resume</h2>
      <p className="text-muted-foreground">
        Please review all the information you&apos;ve entered before submitting
        your resume.
      </p>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Name</h3>
                  <p>{personalDetails.name || "Not provided"}</p>
                </div>

                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>{personalDetails.email || "Not provided"}</p>
                </div>

                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>{personalDetails.phone || "Not provided"}</p>
                </div>

                {personalDetails.address && (
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p>
                      {personalDetails.address.address_line},{" "}
                      {personalDetails.address.city},{" "}
                      {personalDetails.address.country}
                    </p>
                  </div>
                )}

                {personalDetails.tag_line &&
                  personalDetails.tag_line.length > 0 && (
                    <div>
                      <h3 className="font-medium">Tag Lines</h3>
                      <ul className="list-disc pl-5">
                        {personalDetails.tag_line.map((tagLine, index) => (
                          <li key={index}>{tagLine.text}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                {personalDetails.summary &&
                  personalDetails.summary.length > 0 && (
                    <div>
                      <h3 className="font-medium">Summary</h3>
                      <ul className="list-disc pl-5">
                        {personalDetails.summary.map((summary, index) => (
                          <li key={index}>{summary.text}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                {personalDetails.social_links &&
                  personalDetails.social_links.length > 0 && (
                    <div>
                      <h3 className="font-medium">Social Links</h3>
                      <ul className="list-disc pl-5">
                        {personalDetails.social_links.map((link, index) => (
                          <li key={index}>
                            {link.name}:{" "}
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline"
                            >
                              {link.url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience & Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workExperience.length > 0 ? (
                  <div>
                    <h3 className="font-medium mb-2">Work Experience</h3>
                    <div className="space-y-4">
                      {workExperience.map((experience, index) => (
                        <div key={index} className="border p-3 rounded-md">
                          <p className="font-semibold">{experience.company}</p>
                          <p className="font-medium">
                            {experience.position[0]?.text}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(
                              experience.start_date
                            ).toLocaleDateString()}{" "}
                            -
                            {experience.end_date
                              ? new Date(
                                  experience.end_date
                                ).toLocaleDateString()
                              : "Present"}
                          </p>
                          <p className="mt-2">{experience.summary[0]?.text}</p>

                          {experience.highlights[0]?.text.length > 0 && (
                            <div className="mt-2">
                              <p className="font-medium">Highlights:</p>
                              <ul className="list-disc pl-5">
                                {experience.highlights[0]?.text.map(
                                  (highlight, hIndex) => (
                                    <li key={hIndex}>{highlight}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No work experience added.
                  </p>
                )}

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Skills</h3>

                  {skills?.technical && skills.technical.length > 0 ? (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium">Technical Skills</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.technical.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {skill.name} {skill.level ? `(${skill.level})` : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground mb-4">
                      No technical skills added.
                    </p>
                  )}

                  {skills?.soft && skills.soft.length > 0 ? (
                    <div>
                      <h4 className="text-sm font-medium">Soft Skills</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.soft.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm"
                          >
                            {skill.name} {skill.level ? `(${skill.level})` : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      No soft skills added.
                    </p>
                  )}
                </div>

                {achievements.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Achievements</h3>
                    <div className="space-y-3">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="border p-3 rounded-md">
                          <p className="font-semibold">{achievement.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(achievement.date).toLocaleDateString()}
                            {achievement.awarded_by &&
                              ` • Awarded by ${achievement.awarded_by}`}
                          </p>
                          {achievement.summary &&
                            achievement.summary[0]?.text && (
                              <p className="mt-2">
                                {achievement.summary[0].text}
                              </p>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Education & Publications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {education.length > 0 ? (
                  <div>
                    <h3 className="font-medium mb-2">Education</h3>
                    <div className="space-y-4">
                      {education.map((edu, index) => (
                        <div key={index} className="border p-3 rounded-md">
                          <p className="font-semibold">{edu.institution}</p>
                          <p className="font-medium">
                            {edu.degree_level[0]?.text} in {edu.field[0]?.text}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(edu.startDate).toLocaleDateString()} -
                            {new Date(edu.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm mt-1">Score: {edu.score}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No education entries added.
                  </p>
                )}

                {publications.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Publications</h3>
                    <div className="space-y-3">
                      {publications.map((publication, index) => (
                        <div key={index} className="border p-3 rounded-md">
                          <p className="font-semibold">{publication.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {publication.publisher} •{" "}
                            {new Date(
                              publication.releaseDate
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-sm mt-1">
                            <a
                              href={publication.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline"
                            >
                              {publication.url}
                            </a>
                          </p>
                          {publication.summary &&
                            publication.summary[0]?.text && (
                              <p className="mt-2">
                                {publication.summary[0].text}
                              </p>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Other Sections</CardTitle>
            </CardHeader>
            <CardContent>
              {otherLists.length > 0 ? (
                <div className="space-y-6">
                  {otherLists.map((list, index) => (
                    <div key={index} className="border p-3 rounded-md">
                      <h3 className="font-medium">{list.heading[0]?.text}</h3>
                      <p className="mt-2">{list.summary[0]?.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No additional sections added.
                </p>
              )}
            </CardContent>
          </Card>

          <div className="p-4 bg-muted rounded-md">
            <h3 className="font-medium mb-2">Ready to Submit</h3>
            <p className="text-muted-foreground mb-4">
              Please review all the information above. Once you submit, your
              engineering resume will be generated based on this information.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
