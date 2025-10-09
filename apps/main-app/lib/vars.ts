export const DUMMY_MODE = process.env.DUMMY_MODE === "true" || false;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const DEFAULT_TAG_NAME = "#common";
export const RESUME_SCHEMA_VERSION = "1.0";

export const GettingStartedChatInitMessage = [
  {
    id: "1",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi, you can provide me more detail about you through chat or a resume file otherwise you can continue and edit later.",
      },
    ],
  },
];
