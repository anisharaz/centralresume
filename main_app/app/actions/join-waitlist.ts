"use server";

import prisma from "@/lib/db";

export async function joinWaitlist(email: string) {
  try {
    await prisma.waitlist.upsert({
      where: {
        email: email,
      },
      update: {
        email: email,
      },
      create: {
        email: email,
      },
    });
    return {
      success: true,
      message: "You have been added to the waitlist.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
