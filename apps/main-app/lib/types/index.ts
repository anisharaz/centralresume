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

export interface GettingStartedChatDoc {
  userID: string;
  messages: UIMessage[];
}
