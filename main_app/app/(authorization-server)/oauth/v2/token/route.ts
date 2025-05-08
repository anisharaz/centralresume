import prisma from "@/lib/db";
import { GenerateAccessToken } from "@/lib/oauth";

export async function GET(request: Request) {
  // TODO code challenge verifier
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client_id");
  const clientSecret = searchParams.get("client_secret");
  const grantToken = searchParams.get("grantToken");
  console.log(clientId, clientSecret, grantToken);

  if (!clientId || !clientSecret || !grantToken) {
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
      grantToken: grantToken as string,
    },
  });

  if (!grantTokenFromDB) {
    return new Response("Invalid Grant token", { status: 400 });
  }

  const accessToken = await prisma.oauthAccessToken.create({
    data: {
      accessToken: GenerateAccessToken(),
      createdAt: new Date(),
      updatedAt: new Date(),
      scope: grantTokenFromDB?.scope as string,
      oauthclientId: clientId,
      userId: grantTokenFromDB?.userId as string,
    },
  });

  return new Response(
    JSON.stringify({ access_token: accessToken.accessToken }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
}
