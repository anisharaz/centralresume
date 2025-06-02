"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { $Enums } from "@prisma/client";
import { nanoid } from "nanoid";
import { headers } from "next/headers";

export async function createProfileLink(params: {
  tag: string;
  visibility: $Enums.VISIBILITY;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    const linkId = nanoid();
    await prisma.profileLink.create({
      data: {
        linkId: linkId,
        resumeTagName: params.tag,
        visibility: params.visibility,
        userId: session.session.userId,
      },
    });

    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    console.error("Error creating profile link:", error);
    return {
      success: false,
      error: error.message || "Failed to create profile link",
    };
  }
}

export async function deleteProfileLink(linkId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    await prisma.profileLink.delete({
      where: {
        id: linkId,
        userId: session.session.userId, // Ensure user owns this link
      },
    });

    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    console.error("Error deleting profile link:", error);
    return {
      success: false,
      error: error.message || "Failed to delete profile link",
    };
  }
}

export async function toggleProfileLinkVisibility(
  linkId: string,
  visibility: $Enums.VISIBILITY
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    await prisma.profileLink.update({
      where: {
        id: linkId,
        userId: session.session.userId, // Ensure user owns this link
      },
      data: {
        visibility: visibility,
      },
    });

    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    console.error("Error updating profile link visibility:", error);
    return {
      success: false,
      error: error.message || "Failed to update profile link visibility",
    };
  }
}
