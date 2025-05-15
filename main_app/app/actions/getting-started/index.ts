"use server";

import { ENGINEERING_RESUME_TYPE } from "@/lib/zod/schemas";

export async function HandleResumeCreation({
  resumeData,
}: {
  resumeData: ENGINEERING_RESUME_TYPE;
}) {
  console.log("Resume Data:", JSON.stringify(resumeData, null, 2));
  return { success: true };
}
