import { auth } from "@/lib/auth";
import GettingStartedForm from "@/components/getting-started-page";
import prisma, { MongoDbConnect } from "@/lib/db";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";
import { GettingStartedChatModel } from "@/lib/schemas";
import { GettingStartedChatInitMessage } from "@/lib/vars";

async function GettingStarted() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    permanentRedirect("/auth/login");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  if (user?.completedSignup === "true") permanentRedirect("/user/profile");

  await MongoDbConnect();
  const ChatHistory = await GettingStartedChatModel.findOneAndUpdate(
    { userID: session.user.id },
    {
      $setOnInsert: {
        userID: session.user.id,
        messages: GettingStartedChatInitMessage,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  return (
    <GettingStartedForm
      defaultData={{
        firstName: user?.name.split(" ")[0] || "",
        lastName: user?.name.split(" ")[1] || "",
        email: user?.email as string,
      }}
      chatHistory={ChatHistory.messages}
    />
  );
}

export default GettingStarted;
