import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/schema";
import { UIMessage } from "ai";

export type AllowOauthAccessToGeneralTagParams = {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  code_challenge: string;
  code_challenge_method: string;
  scope: string;
};

export type ServerActionResponse<T> = Promise<{
  success: boolean;
  message?: string | null;
  error?: string | null;
  data?: T | null;
}>;

export type MyUIMessage = UIMessage<
  never, // metadata type
  {
    ResumeData: RESUME_SCHEMA_TYPE;
  } // data parts type
>;
