import prisma from "@/lib/db";
import { GenerateAccessToken } from "@/lib/oauth";
import { hash } from "crypto";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client_id");
  const clientSecret = searchParams.get("client_secret");
  const grantToken = searchParams.get("grant_token");
  const code_verifier = searchParams.get("code_verifier");

  if (!clientId || !clientSecret || !grantToken || !code_verifier) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const oauthClient = await prisma.oauthClient.findUnique({
    where: {
      clientSecret: clientSecret,
      clientId: clientId,
    },
  });

  if (!oauthClient) {
    return new Response("invalid oauthclient credentials", { status: 400 });
  }

  const grantTokenFromDB = await prisma.oauthGrantToken.findUnique({
    where: {
      oauthclientId: clientId,
      grantToken: grantToken,
    },
    include: {
      codeChallenge: true,
    },
  });

  // TODO update the challenge method resolution to better one
  const code_challenge_create = hash(
    grantTokenFromDB?.codeChallenge.codeChallengeMethod == "S256"
      ? "sha256"
      : "sha256",
    Buffer.from(code_verifier)
  );
  if (!grantTokenFromDB) {
    return new Response("Invalid Grant token", { status: 400 });
  }

  if (grantTokenFromDB.codeChallenge.codeChallenge !== code_challenge_create) {
    return new Response("invalid code verifier", { status: 400 });
  }

  let access_token = "";
  await prisma.$transaction(async (tx) => {
    const accessToken = await tx.oauthAccessToken.create({
      data: {
        accessToken: GenerateAccessToken(),
        createdAt: new Date(),
        updatedAt: new Date(),
        scope: grantTokenFromDB?.scope as string,
        oauthclientId: clientId,
        userId: grantTokenFromDB?.userId as string,
      },
    });
    access_token = accessToken.accessToken;
    await tx.oauthGrantToken.delete({
      where: {
        id: grantTokenFromDB.id,
      },
    });
    await tx.codeChallenge.delete({
      where:{
        id: grantTokenFromDB.codeChallengeId,
      }
    })
  });

  return new Response(JSON.stringify({ access_token: access_token }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
