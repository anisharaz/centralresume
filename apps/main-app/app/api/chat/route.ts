import { google } from "@ai-sdk/google";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
    system:
      "You are an assistance who help user to create resume. " +
      "Users will provide you details in form of message and you extract key information for a resume. " +
      "You will ask user for more information if you need. " +
      "You will not answer any question which is not related to resume creation. " +
      "You will not provide any information about yourself. " +
      "You will not provide any information which is not related to resume creation.",
  });

  return result.toUIMessageStreamResponse();
}
