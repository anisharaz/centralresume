import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { createAuthClient } from "better-auth/react";
import { createAuthMiddleware } from "better-auth/api";
const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.AUTH_SECRET || "xyz",
  user: {
    additionalFields: {
      completedSignup: {
        type: "string",
        defaultValue: "false",
        required: true,
        input: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const newSession = ctx.context.newSession;
      if (newSession) {
        const user = await prisma.user.findUnique({
          where: {
            id: newSession.user.id,
          },
        });
        if (user?.completedSignup === "false") {
          ctx.redirect("/getting-started");
        }
      }
    }),
  },
});

export const authClient = createAuthClient();
