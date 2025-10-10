import { auth } from "@/lib/auth";
import GettingStartedForm from "@/components/getting-started-page";
import prisma, { MongoResumeDBClient } from "@/lib/db";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";
import {
  DEFAULT_TAG_NAME,
  GetGettingStartedChatInitMessage,
  MONGODB_GETTING_STARTED_CHAT_COLLECTION_NAME,
} from "@/lib/vars";
import { GettingStartedChatDoc } from "@/lib/types";
import { UIMessage } from "ai";

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

  const collection = MongoResumeDBClient.collection<GettingStartedChatDoc>(
    MONGODB_GETTING_STARTED_CHAT_COLLECTION_NAME
  );
  const ChatHistory = await collection.findOneAndUpdate(
    { userID: session.user.id },
    {
      $setOnInsert: {
        userID: session.user.id,
        messages: GetGettingStartedChatInitMessage({
          initData: {
            firstName: user?.name.split(" ")[0] || "",
            lastName: user?.name.split(" ")[1] || "",
            email: user?.email as string,
            tagLine: "Computer science student at ..(edit me)..",
            initialTag: DEFAULT_TAG_NAME,
          },
        }),
      },
    },
    {
      upsert: true,
      returnDocument: "after", // same as { new: true } in mongoose
    }
  );

  return (
    <GettingStartedForm
      defaultData={{
        firstName: user?.name.split(" ")[0] || "",
        lastName: user?.name.split(" ")[1] || "",
        email: user?.email as string,
      }}
      chatHistory={ChatHistory?.messages as UIMessage[]}
    />
  );
}

export default GettingStarted;
