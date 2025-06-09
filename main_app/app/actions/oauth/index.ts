"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { GenerateGrantToken, GenerateClientSecret } from "@/lib/oauth";
import { AllowOauthAccessToGeneralTagParams } from "@/lib/types";
import { createOauthClientSchema } from "@/lib/zod/schemas";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function AllowOauthAccessToGeneralTag(
  params: AllowOauthAccessToGeneralTagParams
) {
  let url = "";
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) throw new Error("Session not found");
    if (Object.values(params).some((value) => value === undefined))
      throw new Error("Missing required parameters");

    const oauth_client = await prisma.oauthClient.findUnique({
      where: {
        clientId: params.client_id,
      },
    });
    if (!oauth_client) throw new Error("Client not found");
    if (oauth_client.redirect_uri !== params.redirect_uri)
      throw new Error("Redirect URI mismatch");

    let oauthGrantToken = "";
    await prisma.$transaction(async (tx) => {
      const codeChallengeDbResponse = await tx.codeChallenge.create({
        data: {
          codeChallenge: params.code_challenge,
          codeChallengeMethod: params.code_challenge_method,
          userId: session.user.id,
          oauthClientId: params.client_id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      const grantTokenResponse = await tx.oauthGrantToken.create({
        data: {
          grantToken: GenerateGrantToken(),
          scope: params.scope,
          userId: session.user.id,
          oauthclientId: params.client_id,
          createdAt: new Date(),
          updatedAt: new Date(),
          codeChallengeId: codeChallengeDbResponse.id,
        },
      });
      oauthGrantToken = grantTokenResponse.grantToken;
    });
    const redirectUrl = new URL(params.redirect_uri);
    redirectUrl.searchParams.set("grantToken", oauthGrantToken);
    redirectUrl.searchParams.set("scope", params.scope);
    url = redirectUrl.toString();
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
  redirect(url);
}

export async function CreateOauthClient(
  params: z.infer<typeof createOauthClientSchema>
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) throw new Error("Session not found");
    const paramCheck = createOauthClientSchema.safeParse(params);
    if (paramCheck.success === false) throw new Error("Invalid parameters");
    await prisma.oauthClient.create({
      data: {
        clientSecret: GenerateClientSecret(),
        redirect_uri: params.redirectUri,
        name: params.name,
        userId: session.user.id,
        image: null,
        description: params.description,
        website: params.website,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    revalidatePath("/user/setting/oauth");
    return {
      success: true,
      message: "Oauth client created successfully",
      data: null,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}

export async function DeleteOauthClient(clientId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) throw new Error("Session not found");

    // Verify the client belongs to the current user
    const oauthClient = await prisma.oauthClient.findUnique({
      where: {
        clientId: clientId,
      },
    });

    if (!oauthClient) throw new Error("OAuth client not found");
    if (oauthClient.userId !== session.user.id) {
      throw new Error(
        "Unauthorized: You can only delete your own OAuth clients"
      );
    }

    // Delete the OAuth client (cascade will handle related records)
    await prisma.oauthClient.delete({
      where: {
        clientId: clientId,
      },
    });

    revalidatePath("/user/setting/oauth");
    return {
      success: true,
      message: "OAuth client deleted successfully",
      data: null,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}
