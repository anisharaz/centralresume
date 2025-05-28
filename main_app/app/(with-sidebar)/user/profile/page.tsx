// import { MapPin } from "lucide-react";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import ResumeSectionCard from "./ResumeSectionCard";
import { headers } from "next/headers";
import SwitchCurrentResumeTag from "./switch-resume-tag";
import prisma from "@/lib/db";
import { Suspense } from "react";
import { getResumeFromResumeStore } from "@/lib/services/resume-store";
import { Resume } from "@/lib/resume";
import { PersonalDetailsCard } from "@/components/resume-view/personal-detail-section";
export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resumeProfile = (await searchParams).resumeProfile;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    include: {
      resumeProfiles: {
        select: {
          resumeProfileTagName: true,
        },
        orderBy: {
          resumeProfileTagName: "asc",
        },
      },
    },
  });

  const data = await getResumeFromResumeStore({
    userId: session?.session.userId as string,
    resumeProfile: "engineering",
  });
  const resume = new Resume(data);
  const resumeByTag = resume.getByTag(
    resumeProfile
      ? resumeProfile
      : (user?.resumeProfiles[0]?.resumeProfileTagName as string)
  );

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
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        {/* <p className="text-lg text-muted-foreground mt-1">Devops engineer</p>
        <div className="flex items-center mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>India</span>
        </div> */}
      </div>
      <Separator className="my-4" />

      <div className="space-y-4">
        <div className="space-y-2">
          <Suspense>
            {user?.resumeProfiles && (
              <SwitchCurrentResumeTag
                resumeProfileTagName={user.resumeProfiles}
                tagSelected={
                  resumeProfile
                    ? resumeProfile
                    : (user.resumeProfiles[0]?.resumeProfileTagName as string)
                }
              />
            )}
          </Suspense>
        </div>

        <PersonalDetailsCard data={resumeByTag.personal_details} />
      </div>
    </div>
  );
}
