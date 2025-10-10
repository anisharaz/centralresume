import { StoreGettingStartedChat } from "@/lib/ai/chat-store/getting-started-chat";
import { auth } from "@/lib/auth";
import { google } from "@ai-sdk/google";
import { RESUME_ZOD_SCHEMA } from "@centralresume/resume-core/schema";

import {
  convertToModelMessages,
  createIdGenerator,
  streamText,
  tool,
  UIMessage,
} from "ai";
import { headers } from "next/headers";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { messages }: { messages: UIMessage[] } = await req.json();
  const responses = streamText({
    model: google("gemini-2.5-flash"),
    system:
      "You are an assistant who collects details for resume from user. " +
      "Users will provide you details in form of message and you extract key information " +
      "If the user hasn't provided all the fields required by the tool schema ask for only the missing fields " +
      "Fields that are array can be left empty. Only call the tool once you have all required information. Add the tag #common in every detail that user provide according to the TAG schema" +
      "If the user tell to generate some detail then do so. " +
      "if user wants to update any data then then do so and again call the tool by validating the schema " +
      "You will not answer any question which is not related to resume creation. ",
    messages: convertToModelMessages(messages),
    tools: {
      extractResumeDataFromUserDescription: tool({
        description: "Build a structured resume object.",
        name: "extractResumeDataFromUserDescription",
        inputSchema: RESUME_ZOD_SCHEMA,
        async execute(data) {
          const res = RESUME_ZOD_SCHEMA.safeParse(data);
          return { resume: data, success: res.success };
        },
      }),
    },
  });
  return responses.toUIMessageStreamResponse({
    originalMessages: messages,
    generateMessageId: createIdGenerator({
      prefix: "msg",
      size: 16,
    }),
    onFinish: async (result) => {
      await StoreGettingStartedChat(
        result.messages,
        session?.user.id as string
      );
    },
  });
}
