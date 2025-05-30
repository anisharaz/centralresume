"use server";

import { auth } from "@/auth";
import {
  getResumeFromResumeStore,
  updateResumeInResumeStore,
} from "@/lib/services/resume-store";
import { headers } from "next/headers";
import {
  WORK_EXPERIENCE_SCHEMA_TYPE,
  SKILLS_SCHEMA_TYPE,
  ACHIEVEMENT_SCHEMA_TYPE,
  EDUCATION_SCHEMA_TYPE,
  OTHER_LIST_SCHEMA_TYPE,
  PERSONAL_DETAILS_SCHEMA_TYPE,
  PUBLICATION_SCHEMA_TYPE,
} from "@/lib/zod/schemas/resume";
import { revalidatePath } from "next/cache";

type newResumeData =
  | {
      personal_details: PERSONAL_DETAILS_SCHEMA_TYPE;
    }
  | {
      work_experience: WORK_EXPERIENCE_SCHEMA_TYPE;
    }
  | {
      skills: SKILLS_SCHEMA_TYPE;
    }
  | {
      education: EDUCATION_SCHEMA_TYPE;
    }
  | {
      achievements: ACHIEVEMENT_SCHEMA_TYPE;
    }
  | {
      otherLists: OTHER_LIST_SCHEMA_TYPE;
    }
  | {
      publications: PUBLICATION_SCHEMA_TYPE;
    };

export async function updateResume({
  newResumeData,
}: {
  newResumeData: newResumeData;
}): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");
    const data_key = Object.keys(newResumeData)[0];
    const resumeData = await getResumeFromResumeStore({
      resumeProfile: "engineering",
      userId: session.session.userId,
    });
    (resumeData as any)[data_key] = (newResumeData as any)[data_key];
    await updateResumeInResumeStore({
      resumeData: resumeData,
      userId: session.session.userId,
    });
    revalidatePath("/user/profile");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
