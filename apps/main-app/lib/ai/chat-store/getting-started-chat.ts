import { MongoDbConnect } from "@/lib/db";
import { GettingStartedChatModel } from "@/lib/schemas";
import { UIMessage } from "ai";

export async function GetGettingStartedChat(
  userId: string
): Promise<UIMessage[]> {
  await MongoDbConnect();
  const res = await GettingStartedChatModel.findOne({
    userID: userId,
  });
  return res?.get("messages");
}
export async function StoreGettingStartedChat(
  message: UIMessage[],
  userId: string
) {
  await MongoDbConnect();
  await GettingStartedChatModel.findOneAndUpdate(
    { userID: userId },
    { $set: { messages: message } },
    { upsert: true, new: true }
  );
}
