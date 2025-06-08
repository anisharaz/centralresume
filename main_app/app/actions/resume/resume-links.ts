"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { $Enums } from "@prisma/client";
import { nanoid } from "nanoid";
import { headers } from "next/headers";

export async function createResumeLink(params: {
  tag: string;
  visibility: $Enums.VISIBILITY;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    const linkId = nanoid();
    await prisma.resumeLink.create({
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
    console.error("Error creating resume link:", error);
    return {
      success: false,
      error: error.message || "Failed to create resume link",
    };
  }
}

export async function deleteResumeLink(linkId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    await prisma.resumeLink.delete({
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
    console.error("Error deleting resume link:", error);
    return {
      success: false,
      error: error.message || "Failed to delete resume link",
    };
  }
}

export async function toggleResumeLinkVisibility(
  linkId: string,
  visibility: $Enums.VISIBILITY
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) throw new Error("User not authenticated");

    await prisma.resumeLink.update({
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
    console.error("Error updating resume link visibility:", error);
    return {
      success: false,
      error: error.message || "Failed to update resume link visibility",
    };
  }
}
