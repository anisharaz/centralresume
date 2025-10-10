import { UIMessage } from "ai";

export const DUMMY_MODE = process.env.DUMMY_MODE === "true" || false;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const DEFAULT_TAG_NAME = "#common";
export const RESUME_SCHEMA_VERSION = "1.0";

export function GetGettingStartedChatInitMessage({
  initData,
}: {
  initData: {
    firstName: string;
    lastName: string;
    email: string;
    tagLine: string;
    initialTag: string;
  };
}): UIMessage[] {
  return [
    {
      id: "1",
      role: "system",
      parts: [
        {
          type: "text",
          text: `user first name is ${initData.firstName}, last name is ${initData.lastName} and email is ${initData.email}`,
        },
      ],
    },
    {
      id: "2",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "Hi, you can provide me more detail about you through chat or a resume file otherwise you can continue and edit later.",
        },
      ],
    },
  ];
}

export const MONGODB_RESUME_COLLECTION_NAME = "resumes";
export const MONGODB_GETTING_STARTED_CHAT_COLLECTION_NAME =
  "gettingstartedchats";
