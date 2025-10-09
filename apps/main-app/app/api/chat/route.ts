import { google } from "@ai-sdk/google";
import { RESUME_ZOD_SCHEMA } from "@centralresume/resume-core/schema";

import { convertToModelMessages, streamText, tool, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const responses = streamText({
    model: google("gemini-2.5-flash"),
    system:
      "You are an assistant who collects details for resume from user. " +
      "Users will provide you details in form of message and you extract key information " +
      "If the user hasn't provided all the fields required by the tool schema ask for the missing fields in natural language. " +
      "Only ask the minimal required information and can leave other fields empty. Only call the tool once you have all required information. " +
      "You will not answer any question which is not related to resume creation. ",
    messages: convertToModelMessages(messages),
    tools: {
      extractResumeDataFromUserDescription: tool({
        description: "Build a structured resume object.",
        name: "extractResumeDataFromUserDescription",
        inputSchema: RESUME_ZOD_SCHEMA,
        async execute(data) {
          return data;
        },
      }),
    },
  });
  return responses.toUIMessageStreamResponse();
}
