import { resumeBackendAxiosClient } from "@/lib/axios-client";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";

export async function getResumeFromResumeStore({ userId }: { userId: string }) {
  const { data } = await resumeBackendAxiosClient.get("/v1/internal/resume", {
    params: {
      userId: userId,
    },
  });
  return data as RESUME_SCHEMA_TYPE;
}

export async function saveResumeToResumeStore({
  resumeData,
  userId,
}: {
  resumeData: RESUME_SCHEMA_TYPE;
  userId: string;
}) {
  const { data, status } = await resumeBackendAxiosClient.post(
    "/v1/internal/resume",
    resumeData,
    {
      params: {
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
  resumeData: RESUME_SCHEMA_TYPE;
  userId: string;
}) {
  const { status } = await resumeBackendAxiosClient.put(
    "/v1/internal/resume",
    resumeData,
    {
      params: {
        userId: userId,
      },
    }
  );

  return status;
}
