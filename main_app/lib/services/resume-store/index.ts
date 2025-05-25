import { resumeBackendAxiosClient } from "@/lib/axios-client";

export async function getResumeFromResumeStore({
  resumeProfile,
  userId,
}: {
  resumeProfile: string;
  userId: string;
}) {
  const { data } = await resumeBackendAxiosClient.get("/v1/internal/resume", {
    params: {
      schema: resumeProfile,
      userId: userId,
    },
  });
  return data;
}
