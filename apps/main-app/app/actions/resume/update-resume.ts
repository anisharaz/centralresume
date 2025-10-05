"use server";

import { auth } from "@/lib/auth";
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
  PROJECTS_SCHEMA_TYPE,
} from "@centralresume/resume-core/types";
import { revalidatePath } from "next/cache";
import { Resume } from "@centralresume/resume-core";
import prisma from "@/lib/db";
import { $Enums } from "@centralresume/database";

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
      projects: PROJECTS_SCHEMA_TYPE;
    }
  | {
      otherLists: OTHER_LIST_SCHEMA_TYPE;
    }
  | {
      publications: PUBLICATION_SCHEMA_TYPE;
    };

/**
 * Syncs resume tags with database
 * - Adds new tags that are present in resume but not in database
 * - Removes tags that are present in database but not in resume
 */
async function syncResumeTagsWithDatabase(userId: string, resumeData: any) {
  const resume = new Resume(resumeData);
  const currentTags = resume.extractTags();

  // Get existing tags from database
  const existingTagsFromDB = await prisma.resumeTags.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      resumeTagName: true,
    },
  });

  const existingTagNames = existingTagsFromDB.map((tag) => tag.resumeTagName);

  // Find tags to add (present in resume but not in database)
  const tagsToAdd = currentTags.filter(
    (tag) => !existingTagNames.includes(tag) && tag !== ""
  );

  // Find tags to remove (present in database but not in resume)
  const tagsToRemove = existingTagsFromDB.filter(
    (tag) =>
      !currentTags.includes(tag.resumeTagName) && tag.resumeTagName !== ""
  );

  // Perform database operations
  if (tagsToAdd.length > 0) {
    await prisma.resumeTags.createMany({
      data: tagsToAdd.map((tagName) => ({
        userId: userId,
        resumeTagName: tagName,
        visibility: $Enums.VISIBILITY.PRIVATE, // Default visibility
      })),
    });
  }

  if (tagsToRemove.length > 0) {
    await prisma.resumeTags.deleteMany({
      where: {
        userId: userId,
        id: {
          in: tagsToRemove.map((tag) => tag.id),
        },
      },
    });
  }

  return {
    tagsAdded: tagsToAdd,
    tagsRemoved: tagsToRemove.map((tag) => tag.resumeTagName),
  };
}

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
      userId: session.session.userId,
    });

    (resumeData as any)[data_key] = (newResumeData as any)[data_key];

    await updateResumeInResumeStore({
      resumeData: new Resume(resumeData).getResume(),
      userId: session.session.userId,
    });

    // Sync resume tags with database
    await syncResumeTagsWithDatabase(session.session.userId, resumeData);

    revalidatePath("/user/profile");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
