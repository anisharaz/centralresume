import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import SwitchCurrentResumeTag from "./switch-resume-tag";
import prisma from "@/lib/db";
import { Suspense } from "react";
import { getResumeFromResumeStore } from "@/lib/services/resume-store";
import { Resume } from "@centralresume/resume-core";
import BannerBg from "@/public/banner_bg.jpg";
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
import Image from "next/image";

export default async function ProfilePage() {
  const cookie = await cookies();

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

  const availableTags = user?.resumeTags.map((tag) => tag.resumeTagName) || [];
  const currentSelectedTag = cookie.get("currentTag")?.value
    ? availableTags.includes(cookie.get("currentTag")?.value as string)
      ? (cookie.get("currentTag")?.value as string)
      : availableTags[0]
    : availableTags[0];

  const data = await getResumeFromResumeStore({
    userId: session?.session.userId as string,
  });
  const resume = new Resume(data);
  const resumeByTag = resume.getByTag(currentSelectedTag);
  return (
    <div className="container mx-auto w-full pb-10">
      <div className="relative px-1 md:my-10 my-4">
        <div className="h-48 w-full flex items-center justify-center">
          <Image src={BannerBg} alt="" fill className="object-cover border" />
          <div className="font-bold md:text-5xl z-10 text-3xl text-center text-slate-800 dark:text-slate-200 italic ">
            {user?.userProfile?.bannerText}
          </div>
          <BannerTextEdit
            currentBannerText={
              user?.userProfile?.bannerText || "Welcome to my profile (edit me)"
            }
          />
        </div>
      </div>

      <div className="">
        <div className="my-6 md:mx-4 mx-2">
          <Suspense>
            <SwitchCurrentResumeTag
              availableTags={availableTags}
              tagSelected={currentSelectedTag}
            />
          </Suspense>
        </div>
        <div className="space-y-6 border md:mx-4 mx-2">
          <PersonalDetailsCard
            data={resumeByTag.personal_details}
            dataWithTag={resume.getResume().personal_details}
            resumeTags={availableTags}
          />
          <Separator className="my-4" />
          <WorkExperienceCard
            data={resumeByTag.work_experience}
            dataWithTag={resume.getResume().work_experience}
            resumeTags={availableTags}
          />
          <Separator className="my-4" />
          <SkillsCard
            data={resumeByTag.skills}
            dataWithTag={resume.getResume().skills}
            resumeTags={availableTags}
          />
          <Separator className="my-4" />
          <ProjectsCard
            data={resumeByTag.projects}
            dataWithTag={resume.getResume().projects}
            resumeTags={availableTags}
          />
          <Separator className="my-4" />
          <AchievementsCard
            data={resumeByTag.achievements}
            dataWithTag={resume.getResume().achievements}
            resumeTags={availableTags}
          />
          <Separator className="my-4" />
          <EducationCard
            data={resumeByTag.education}
            dataWithTag={resume.getResume().education}
            resumeTags={availableTags}
          />
          <Separator className="my-4" />
          <PublicationsCard
            data={resumeByTag.publications}
            dataWithTag={resume.getResume().publications}
            resumeTags={availableTags}
          />
          <Separator className="my-4" />
          <OtherListsCard
            data={resumeByTag.otherLists}
            dataWithTag={resume.getResume().otherLists}
            resumeTags={availableTags}
          />
        </div>
      </div>
    </div>
  );
}
