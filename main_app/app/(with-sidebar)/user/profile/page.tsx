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
  });
  const resume = new Resume(data);
  const resumeByTag = resume.getByTag(
    resumeProfile ? resumeProfile : DEFAULT_TAG_NAME
  );
  const tags = user?.resumeTags.map((tag) => tag.resumeTagName) || [];
  return (
    <div className="container mx-auto w-full pb-10">
      <div className="relative px-1">
        <div className="h-48 w-full bg-secondary border flex items-center justify-center">
          <div className="font-bold md:text-5xl text-3xl text-center text-slate-800 dark:text-slate-200 italic ">
            {user?.userProfile?.bannerText}
          </div>
          <BannerTextEdit
            currentBannerText={
              user?.userProfile?.bannerText || "Welcome to my profile (edit it)"
            }
          />
        </div>
      </div>

      <div className="">
        <div className="my-6 md:mx-4 mx-2">
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
        </div>
        <div className="space-y-6 border md:mx-4 mx-2">
          <PersonalDetailsCard
            data={resumeByTag.personal_details}
            dataWithTag={resume.getResume().personal_details}
            resumeTags={tags}
          />
          <Separator className="my-4" />
          <WorkExperienceCard
            data={resumeByTag.work_experience}
            dataWithTag={resume.getResume().work_experience}
            resumeTags={tags}
          />
          <Separator className="my-4" />
          <SkillsCard
            data={resumeByTag.skills}
            dataWithTag={resume.getResume().skills}
            resumeTags={tags}
          />
          <Separator className="my-4" />
          <ProjectsCard
            data={resumeByTag.projects}
            dataWithTag={resume.getResume().projects}
            resumeTags={tags}
          />
          <Separator className="my-4" />
          <AchievementsCard
            data={resumeByTag.achievements}
            dataWithTag={resume.getResume().achievements}
            resumeTags={tags}
          />
          <Separator className="my-4" />
          <EducationCard
            data={resumeByTag.education}
            dataWithTag={resume.getResume().education}
            resumeTags={tags}
          />
          <Separator className="my-4" />
          <PublicationsCard
            data={resumeByTag.publications}
            dataWithTag={resume.getResume().publications}
            resumeTags={tags}
          />
          <Separator className="my-4" />
          <OtherListsCard
            data={resumeByTag.otherLists}
            dataWithTag={resume.getResume().otherLists}
            resumeTags={tags}
          />
        </div>
      </div>
    </div>
  );
}
