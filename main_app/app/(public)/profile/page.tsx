import ErrorPage from "@/components/error-page";
import { AchievementsSectionView } from "@/components/resume-view/components/achievement-section-view";
import { EducationSectionView } from "@/components/resume-view/components/education-section-view";
import { OtherListsSectionView } from "@/components/resume-view/components/others-list-section-view";
import { ProfileDetailSectionView } from "@/components/resume-view/components/profile-detail-section-view";
import { ProjectsSectionView } from "@/components/resume-view/components/projects-section-view";
import { PublicationsSectionView } from "@/components/resume-view/components/publication-section-view";
import { SkillsSectionView } from "@/components/resume-view/components/skills-section-view";
import { WorkExperienceSectionView } from "@/components/resume-view/components/work-experience-section-view";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { Resume } from "@/lib/resume";
import { getResumeFromResumeStore } from "@/lib/services/resume-store";
import { VISIBILITY } from "@prisma/client";

async function PublicProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resumeTag = (await searchParams).resumeTag;
  const linkId = (await searchParams).linkId;
  if (!linkId || !resumeTag) {
    return (
      <ErrorPage
        errorDefinition={{
          error: "Invalid Id or resumeTag",
          errorType: "InvalidParameters",
          errorDescription: "The Id or resumeTag is missing or invalid.",
        }}
      />
    );
  }
  const profileLink = await prisma.profileLink.findUnique({
    where: {
      linkId: linkId,
      resumeTagName: resumeTag,
    },
    include: {
      user: {
        select: {
          userProfile: {
            select: {
              bannerText: true,
            },
          },
        },
      },
    },
  });
  if (!profileLink) {
    return (
      <ErrorPage
        errorDefinition={{
          error: "Invalid Link",
          errorType: "InvalidLink",
          errorDescription: "The requested profile link does not exist.",
        }}
      />
    );
  }
  if (profileLink.visibility === VISIBILITY.PRIVATE) {
    return (
      <ErrorPage
        errorDefinition={{
          error: "Private Profile",
          errorType: "PrivateProfile",
          errorDescription: "This profile is private and cannot be viewed.",
        }}
      />
    );
  }

  const data = await getResumeFromResumeStore({
    userId: profileLink.userId,
  });
  const resume = new Resume(data);
  const resumeByTag = resume.getByTag(resumeTag);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="my-4 h-48 w-full bg-secondary border flex items-center justify-center">
        <div className=" font-bold md:text-5xl text-3xl text-center text-slate-800 dark:text-slate-200 italic ">
          {profileLink.user.userProfile?.bannerText.split("(")[0] ||
            "Welcome to My Profile"}
        </div>
      </div>
      <div className="space-y-6 border m-2 mt-6">
        <ProfileDetailSectionView data={resumeByTag.personal_details} />
        <Separator className="my-4" />
        <WorkExperienceSectionView data={resumeByTag.work_experience} />
        <Separator className="my-4" />
        <SkillsSectionView data={resumeByTag.skills} />
        <Separator className="my-4" />
        <ProjectsSectionView data={resumeByTag.projects} />
        <Separator className="my-4" />
        <AchievementsSectionView data={resumeByTag.achievements} />
        <Separator className="my-4" />
        <EducationSectionView data={resumeByTag.education} />
        <Separator className="my-4" />
        <PublicationsSectionView data={resumeByTag.publications} />
        <Separator className="my-4" />
        <OtherListsSectionView data={resumeByTag.otherLists} />
      </div>
    </div>
  );
}

export default PublicProfilePage;
