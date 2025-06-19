"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { $Enums } from "@prisma/client";
import { headers } from "next/headers";

export async function deleteTag(tagId: string) {
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
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    // TODO: Implement tag creation logic
    // This action is created but left empty as requested

    return {
      success: true,
      message: "Tag creation not yet implemented",
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
