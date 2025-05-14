"use client";

import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/auth";
import { filteredDummyResumeData } from "@/lib/utils";
import ResumeSectionCard from "./ResumeSectionCard";
export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  let dummyResumeData = filteredDummyResumeData;

  // remove version from Data
  dummyResumeData = Object.fromEntries(
    Object.entries(dummyResumeData).filter(([key]) => key !== "version")
  );
  const sections = Object.entries(dummyResumeData);
  return (
    <div className="container mx-auto w-full pb-10">
      <div className="relative">
        <div className="h-48 w-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center">
          <div className="font-bold md:text-5xl text-3xl text-center text-slate-800 dark:text-slate-200 italic ">
            Never Gonna Give Up
          </div>
        </div>
        <div className="absolute -bottom-16 left-8">
          <div className="h-32 w-32 rounded-full bg-neutral-600 border-4 border-white dark:border-neutral-800 shadow-lg">
            <Image
              src={session?.user.image ? session.user.image : "./global.svg"}
              fill
              alt=""
              className="p-2 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 mb-8 px-8">
        <h1 className="text-2xl font-bold">Anish Araz</h1>
        <p className="text-lg text-muted-foreground mt-1">Devops engineer</p>
        <div className="flex items-center mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>India</span>
        </div>
      </div>
      <Separator className="my-4" />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profile" className="text-md font-bold">
            Select profile to view
          </Label>
          <Select defaultValue="#general">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Profile" />
            </SelectTrigger>
            <SelectContent id="profile">
              <SelectGroup>
                <SelectLabel>Profile</SelectLabel>
                <SelectItem value="#general">General</SelectItem>
                <SelectItem value="#devops">Devops</SelectItem>
                <SelectItem value="#sre">SRE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent>content</CardContent>
        </Card> */}
        {sections.map(([key, value]) => (
          <ResumeSectionCard
            key={key}
            title={key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
            data={value}
          />
        ))}
      </div>
    </div>
  );
}
