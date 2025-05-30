import { resumeBackendAxiosClient } from "@/lib/axios-client";
import { RESUME_TYPE } from "@/lib/zod/schemas";

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
  return data as RESUME_TYPE;
}

export async function saveResumeToResumeStore({
  resumeData,
  userId,
}: {
  resumeData: RESUME_TYPE;
  userId: string;
}) {
  const { data, status } = await resumeBackendAxiosClient.post(
    "/v1/internal/resume",
    resumeData,
    {
      params: {
        schema: "engineering",
        userId: userId,
      },
    }
  );
  return {
    data,
    status,
  };
}

export async function updateResumeInResumeStore({
  resumeData,
  userId,
}: {
  resumeData: RESUME_TYPE;
  userId: string;
}) {
  const { status } = await resumeBackendAxiosClient.put(
    "/v1/internal/resume",
    resumeData,
    {
      params: {
        userId: userId,
        schema: "engineering",
      },
    }
  );

  return status;
}
