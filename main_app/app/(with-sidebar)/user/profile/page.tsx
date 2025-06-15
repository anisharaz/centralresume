import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SwitchCurrentResumeTag from "./switch-resume-tag";
import prisma from "@/lib/db";
import { Suspense } from "react";
import { getResumeFromResumeStore } from "@/lib/services/resume-store";
import { Resume } from "@/lib/resume";
import {
  AchievementsCard,
  EducationCard,
  OtherListsCard,
  PersonalDetailsCard,
  PublicationsCard,
  SkillsCard,
  WorkExperienceCard,
} from "@/components/resume-view";
import { ProjectsCard } from "@/components/resume-view/project-section";
import BannerTextEdit from "@/components/banner-text-edit";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { DEFAULT_TAG_NAME } from "@/lib/vars";

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
      resumeTags: {
        select: {
          resumeTagName: true,
        },
        orderBy: {
          resumeTagName: "asc",
        },
      },
      userProfile: {
        select: {
          bannerText: true,
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
    resumeProfile ? resumeProfile : DEFAULT_TAG_NAME
  );
  const nameInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n.charAt(0).toUpperCase())
        .join("")
    : "U";
  return (
    <div className="container mx-auto w-full pb-10">
      <div className="relative">
        <div className="h-48 w-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center">
          <div className="font-bold md:text-5xl text-3xl text-center text-slate-800 dark:text-slate-200 italic ">
            {user?.userProfile?.bannerText}
          </div>
          <BannerTextEdit
            currentBannerText={
              user?.userProfile?.bannerText || "Welcome to my profile (edit it)"
            }
          />
        </div>
        <div className="absolute -bottom-16 left-8">
          <div className="h-32 w-32 rounded-full bg-neutral-600 border-4 border-white dark:border-neutral-800 shadow-lg">
            {session?.user.image && (
              <Image
                src={session?.user.image ? session.user.image : "./global.svg"}
                fill
                alt=""
                className="p-2 rounded-full"
              />
            )}
            <div className="flex justify-center items-center h-full text-2xl font-bold">
              {nameInitials}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 mb-8 px-8 flex items-center gap-3">
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <Link
          href={`/user/setting`}
          className="text-base text-blue-500 hover:underline flex gap-1"
        >
          <Share2 /> <div>Share</div>
        </Link>
      </div>
      <Separator className="my-4" />
      <div>
        <Suspense>
          <SwitchCurrentResumeTag
            resumeProfileTagName={user?.resumeTags}
            tagSelected={
              resumeProfile
                ? resumeProfile
                : (user?.resumeTags[0]?.resumeTagName as string)
            }
          />
        </Suspense>
        <div className="space-y-6 border m-2 mt-6">
          <PersonalDetailsCard
            data={resumeByTag.personal_details}
            dataWithTag={resume.getResume().personal_details}
          />
          <Separator className="my-4" />
          <WorkExperienceCard
            data={resumeByTag.work_experience}
            dataWithTag={resume.getResume().work_experience}
          />
          <Separator className="my-4" />
          <SkillsCard
            data={resumeByTag.skills}
            dataWithTag={resume.getResume().skills}
          />
          <Separator className="my-4" />
          <ProjectsCard
            data={resumeByTag.projects}
            dataWithTag={resume.getResume().projects}
          />
          <Separator className="my-4" />
          <AchievementsCard
            data={resumeByTag.achievements}
            dataWithTag={resume.getResume().achievements}
          />
          <Separator className="my-4" />
          <EducationCard
            data={resumeByTag.education}
            dataWithTag={resume.getResume().education}
          />
          <Separator className="my-4" />
          <PublicationsCard
            data={resumeByTag.publications}
            dataWithTag={resume.getResume().publications}
          />
          <Separator className="my-4" />
          <OtherListsCard
            data={resumeByTag.otherLists}
            dataWithTag={resume.getResume().otherLists}
          />
        </div>
      </div>
    </div>
  );
}
