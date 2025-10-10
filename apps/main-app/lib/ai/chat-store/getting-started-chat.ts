import { MongoResumeDBClient } from "@/lib/db";
import { MONGODB_GETTING_STARTED_CHAT_COLLECTION_NAME } from "@/lib/vars";
import { UIMessage } from "ai";

export async function GetGettingStartedChat(
  userId: string
): Promise<UIMessage[]> {
  const collection = MongoResumeDBClient.collection(
    MONGODB_GETTING_STARTED_CHAT_COLLECTION_NAME
  );
  const res = await collection.findOne({ userID: userId });
  return res?.messages;
}
export async function StoreGettingStartedChat(
  message: UIMessage[],
  userId: string
) {
  const collection = MongoResumeDBClient.collection(
    MONGODB_GETTING_STARTED_CHAT_COLLECTION_NAME
  );
  await collection.findOneAndUpdate(
    { userID: userId },
    { $set: { messages: message } },
    { upsert: true, returnDocument: "after" }
  );
}
