"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Resume } from "@/lib/resume";
import { saveResumeToResumeStore } from "@/lib/services/resume-store";
import { RESUME_TYPE } from "@/lib/zod/schemas";
import { $Enums } from "@prisma/client";
import { headers } from "next/headers";

type ResumeCreationResponse = {
  success: boolean;
  error?: string;
};
export async function HandleResumeCreation({
  resumeData,
}: {
  resumeData: RESUME_TYPE;
}): Promise<ResumeCreationResponse> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    const { data, status } = await saveResumeToResumeStore({
      resumeData: resumeData,
      userId: session.session.userId,
    });

    if (status !== 200) throw new Error("Failed to create resume");
    const resume = new Resume(resumeData);
    const tags = resume.extractTags();
    function resumeProfiles() {
      const profiles = [];
      for (const tag of tags) {
        profiles.push({
          userId: session?.session.userId as string,
          visibility: $Enums.VISIBILITY.PRIVATE,
          resumeProfileTagName: tag,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      return profiles;
    }
    if (tags.length != 0) {
      await prisma.resumeProfiles.createMany({
        data: resumeProfiles(),
      });
    }
    await prisma.$transaction(async (tx) => {
      await tx.userResume.create({
        data: {
          userId: session?.session.userId as string,
          resumeId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      await tx.user.update({
        where: {
          email: session?.user.email as string,
        },
        data: {
          completedSignup: "true",
        },
      });
    });
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
