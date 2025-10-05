import ErrorPage from "@/components/error-page";
import prisma from "@/lib/db";
import { getResumeFromResumeStore } from "@/lib/services/resume-store";
import { Resume } from "@centralresume/resume-core";

import ResumePDFViewer from "@/components/resume-pdf-view";

async function ViewResume({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { linkId, resumeTag } = await searchParams;
  if (!linkId || !resumeTag) {
    return (
      <ErrorPage
        errorDefinition={{
          error: "Link ID or Resume Tag is missing",
          errorDescription:
            "Please provide both linkId and resumeTag in the URL parameters.",
          errorType: "MissingParameters",
        }}
      />
    );
  }

  const resumeLink = await prisma.resumeLink.findUnique({
    where: {
      linkId: linkId,
      resumeTagName: resumeTag,
    },
    select: {
      visibility: true,
      resumeTagName: true,
      userId: true,
    },
  });

  if (!resumeLink) {
    return (
      <ErrorPage
        errorDefinition={{
          error: "Link or tag not found",
          errorDescription: "The requested resume link or tag does not exist",
          errorType: "NotFound",
        }}
      />
    );
  }
  if (resumeLink.visibility == "PRIVATE") {
    return (
      <ErrorPage
        errorDefinition={{
          error: "Private Resume Link",
          errorDescription: "The requested resume link is private.",
          errorType: "NotFound",
        }}
      />
    );
  }

  try {
    // Fetch the complete resume data from the resume store
    const resumeData = await getResumeFromResumeStore({
      userId: resumeLink.userId,
    });

    // Use the Resume class to filter data by the specified tag
    const resume = new Resume(resumeData);
    const filteredResumeData = resume.getByTag(resumeTag);

    return (
      <div className="w-full h-screen">
        <ResumePDFViewer resumeData={filteredResumeData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching resume data:", error);
    return (
      <ErrorPage
        errorDefinition={{
          error: "Failed to load resume",
          errorDescription:
            "There was an error loading the resume data. Please try again later.",
          errorType: "ServerError",
        }}
      />
    );
  }
}

export default ViewResume;
