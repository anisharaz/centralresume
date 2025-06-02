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
    console.log(error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function contactUs(name: string, email: string, message: string) {
  try {
    await prisma.contactUs.create({
      data: {
        name: name,
        email: email,
        message: message,
      },
    });
    return {
      success: true,
      message:
        "Your message has been sent successfully. We'll get back to you soon!",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
