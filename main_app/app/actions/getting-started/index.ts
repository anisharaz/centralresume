"use server";

import { auth } from "@/auth";
import { resumeBackendAxiosClient } from "@/lib/axios-client";
import prisma from "@/lib/db";
import { extractAllTags } from "@/lib/utils";
import { ENGINEERING_RESUME_TYPE } from "@/lib/zod/schemas";
import { $Enums } from "@prisma/client";
import { headers } from "next/headers";

type ResumeCreationResponse = {
  success: boolean;
  error?: string;
};
export async function HandleResumeCreation({
  resumeData,
}: {
  resumeData: ENGINEERING_RESUME_TYPE;
}): Promise<ResumeCreationResponse> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");
    console.log("Resume Data:", JSON.stringify(resumeData, null, 2));
    const { status } = await resumeBackendAxiosClient.post(
      "/v1/internal/resume",
      resumeData,
      {
        params: {
          schema: "engineering",
          userId: session?.user.id,
        },
      }
    );
    if (status !== 200) throw new Error("Failed to create resume");
    const tags = extractAllTags(resumeData);
    function resumeProfiles() {
      const profiles = [];
      for (const tag of tags) {
        profiles.push({
          userId: session?.user.id as string,
          visibility: $Enums.VISIBILITY.PRIVATE,
          resumeProfileTagName: tag,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      return profiles;
    }
    await prisma.resumeProfiles.createMany({
      data: resumeProfiles(),
    });
    // TODO: update completeSignup to true
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
