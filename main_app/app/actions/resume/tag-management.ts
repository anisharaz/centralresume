"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Resume } from "@/lib/resume";
import {
  getResumeFromResumeStore,
  updateResumeInResumeStore,
} from "@/lib/services/resume-store";
import { ServerActionResponse } from "@/lib/types";
import { $Enums } from "@prisma/client";
import { headers } from "next/headers";

export async function createTag(params: {
  fromTag: string;
  newTagName: string;
  visibility: $Enums.VISIBILITY;
}): ServerActionResponse<null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    // Check if tag name already exists for this user
    const existingTag = await prisma.resumeTags.findFirst({
      where: {
        userId: session.session.userId,
        resumeTagName: params.newTagName.trim(),
      },
    });

    if (existingTag) {
      throw new Error("A tag with this name already exists");
    }

    await prisma.resumeTags.create({
      data: {
        userId: session.session.userId,
        resumeTagName: params.newTagName.trim(),
        visibility: params.visibility,
      },
    });
    const resume = await getResumeFromResumeStore({
      userId: session.session.userId,
    });
    const resumeData = new Resume(resume);
    console.log(
      "Resume data before copying tag:",
      JSON.stringify(resumeData.getResume(), null, 2)
    );
    resumeData.copyTag({
      fromTag: params.fromTag,
      newTagName: params.newTagName.trim(),
    });
    console.log(
      "Updated resume data with new tag:",
      JSON.stringify(resumeData.getResume(), null, 2)
    );

    try {
      await updateResumeInResumeStore({
        resumeData: resumeData.getResume(),
        userId: session.session.userId,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update resume store with new tag");
    }
    return {
      success: true,
      message: "Tag created successfully",
      error: null,
    };
  } catch (error: any) {
    console.error("Error creating tag:", error);
    return {
      success: false,
      message: null,
      error: error.message || "Failed to create tag",
    };
  }
}

export async function toggleTagVisibility(
  tagId: string,
  newVisibility: $Enums.VISIBILITY
): ServerActionResponse<null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    // Verify the tag belongs to the user before updating
    const tag = await prisma.resumeTags.findFirst({
      where: {
        id: tagId,
        userId: session.session.userId,
      },
    });

    if (!tag) {
      throw new Error("Tag not found or unauthorized");
    }

    // Update the tag visibility
    await prisma.resumeTags.update({
      where: {
        id: tagId,
      },
      data: {
        visibility: newVisibility,
      },
    });

    return {
      success: true,
      message: `Tag visibility updated to ${newVisibility.toLowerCase()}`,
      error: null,
    };
  } catch (error: any) {
    console.error("Error updating tag visibility:", error);
    return {
      success: false,
      message: null,
      error: error.message || "Failed to update tag visibility",
    };
  }
}
