"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { GenerateGrantToken } from "@/lib/oauth";
import { AllowOauthAccessToGeneralTagParams } from "@/lib/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AllowOauthAccessToGeneralTag(
  params: AllowOauthAccessToGeneralTagParams
) {
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
    redirect(redirectUrl.toString());
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}
