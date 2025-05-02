"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { FormValues } from "@/components/getting-started-form";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<FormValues | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const data = localStorage.getItem("profileData");
    if (data) {
      setProfileData(JSON.parse(data));
    }
  }, []);

  if (!isClient) {
    return null;
  }

  if (!profileData) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="mb-6">
          You need to complete the getting started process first.
        </p>
        <Button asChild>
          <Link href="/getting-started">Go to Getting Started</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      {/* Banner and Profile Section */}
      <div className="relative mb-6">
        <div className="h-48 w-full bg-slate-200"></div>
        <div className="absolute -bottom-16 left-8">
          <div className="h-32 w-32 rounded-none bg-slate-300 border-4 border-white"></div>
        </div>
        <div className="absolute top-4 right-4">
          <Button variant="outline" size="sm" className="bg-white">
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 mb-8 px-8">
        <h1 className="text-2xl font-bold">
          {profileData.firstName} {profileData.lastName}
        </h1>
        {profileData.headline && (
          <p className="text-lg text-muted-foreground mt-1">
            {profileData.headline}
          </p>
        )}
        {profileData.location && (
          <div className="flex items-center mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{profileData.location}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
        {/* Left Column */}
        <div className="space-y-6 md:col-span-2">
          {/* About Section */}
          {profileData.about && (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{profileData.about}</p>
              </CardContent>
            </Card>
          )}

          {/* Experience Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Experience</CardTitle>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent>
              {profileData.experience &&
              profileData.experience.length > 0 &&
              profileData.experience[0].title ? (
                <div className="space-y-6">
                  {profileData.experience.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      {index > 0 && <Separator className="my-4" />}
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="font-medium">{exp.company}</p>
                      {(exp.startDate || exp.endDate) && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {exp.startDate || "Present"} -{" "}
                            {exp.endDate || "Present"}
                          </span>
                        </div>
                      )}
                      {exp.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                      {exp.description && (
                        <p className="mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No experience added yet</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Pencil className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Education Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent>
              {profileData.education &&
              profileData.education.length > 0 &&
              profileData.education[0].school ? (
                <div className="space-y-6">
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="space-y-2">
                      {index > 0 && <Separator className="my-4" />}
                      <h3 className="font-semibold text-lg">{edu.school}</h3>
                      <p className="font-medium">
                        {edu.degree}
                        {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                      </p>
                      {(edu.startDate || edu.endDate) && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {edu.startDate || "Present"} -{" "}
                            {edu.endDate || "Present"}
                          </span>
                        </div>
                      )}
                      {edu.description && (
                        <p className="mt-2">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No education added yet</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Pencil className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Contact Info Section */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {profileData.email && (
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{profileData.email}</p>
                </div>
              )}
              {profileData.phone && (
                <div className="mt-2">
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{profileData.phone}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent>
              {profileData.skills && profileData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No skills added yet</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Pencil className="h-4 w-4 mr-2" />
                    Add Skills
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
