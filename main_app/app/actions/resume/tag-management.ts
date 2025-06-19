"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { ServerActionResponse } from "@/lib/types";
import { $Enums } from "@prisma/client";
import { headers } from "next/headers";

export async function deleteTag(tagId: string): ServerActionResponse<null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    // Verify the tag belongs to the user before deleting
    const tag = await prisma.resumeTags.findFirst({
      where: {
        id: tagId,
        userId: session.session.userId,
      },
    });

    if (!tag) {
      throw new Error("Tag not found or unauthorized");
    }

    // TODO: update mongodb resume data

    await prisma.resumeTags.delete({
      where: {
        id: tagId,
      },
    });

    return {
      success: true,
      message: "Tag deleted successfully",
      error: null,
    };
  } catch (error: any) {
    console.error("Error deleting tag:", error);
    return {
      success: false,
      message: null,
      error: error.message || "Failed to delete tag",
    };
  }
}

export async function createTag(params: {
  fromTag?: string;
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
        resumeTagName: params.newTagName.toLowerCase().trim(),
      },
    });

    if (existingTag) {
      throw new Error("A tag with this name already exists");
    }

    // Create the new tag
    const newTag = await prisma.resumeTags.create({
      data: {
        userId: session.session.userId,
        resumeTagName: params.newTagName.toLowerCase().trim(),
        visibility: params.visibility,
      },
    });

    // If fromTag is provided, we could copy resume data here
    // TODO: Implement copying resume data from the source tag if needed
    if (params.fromTag) {
      // For now, we'll just create the tag
      // Later this could involve copying resume data from MongoDB
      console.log(
        `Creating tag "${params.newTagName}" based on tag ID: ${params.fromTag}`
      );
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
    const updatedTag = await prisma.resumeTags.update({
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
