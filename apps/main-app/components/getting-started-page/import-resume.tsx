"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputMessage,
  PromptInputBody,
  PromptInputAttachments,
  PromptInputAttachment,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputActionMenu,
  PromptInputActionMenuTrigger,
  PromptInputActionMenuContent,
  PromptInputActionAddAttachments,
} from "@/components/ai-elements/prompt-input";
import { File, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";
import { Response } from "@/components/ai-elements/response";
import {
  RESUME_SCHEMA_TYPE,
  RESUME_ZOD_SCHEMA,
} from "@centralresume/resume-core/schema";
import { Button } from "../ui/button";
import { Loader } from "../ai-elements/loader";

const ImportExistingResume = ({
  chatHistory,
  isSubmitting,
  handleSubmit,
  setResumeData,
}: {
  chatHistory: UIMessage[];
  isSubmitting: boolean;
  handleSubmit: () => void;
  setResumeData: (data: RESUME_SCHEMA_TYPE) => void;
}) => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    messages: chatHistory,
  });
  const handlePromptSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage({
      text: message.text || "Sent with attachments",
      files: message.files,
    });
    setInput("");
  };
  useEffect(() => {
    const toolCallPart = messages
      .filter(
        (msg) =>
          msg.role === "assistant" &&
          msg.parts.some(
            (part) =>
              part.type === "tool-extractResumeDataFromUserDescriptionOrFile"
          )
      )
      .at(-1)
      ?.parts.filter(
        (part) =>
          part.type === "tool-extractResumeDataFromUserDescriptionOrFile"
      )
      .at(-1);

    const res: {
      resume: RESUME_SCHEMA_TYPE;
      success: boolean;
      // @ts-expect-error: missing type
    } = toolCallPart?.output;

    if (res?.success) {
      const parse = RESUME_ZOD_SCHEMA.safeParse(res.resume);
      if (parse.success) {
        setResumeData(parse.data);
      }
    }
  }, [messages, setResumeData]);

  return (
    <>
      <div className="mx-auto p-2 relative size-full rounded-lg border">
        <div className="flex flex-col min-h-[600px] ">
          <Conversation className="">
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState
                  icon={<MessageSquare className="size-10" />}
                  title="Lets re-use your existing resume"
                  description="Your current details just contain your full name. You can either describe about you or upload a resume file to add more detail."
                />
              ) : (
                messages.map((message, msgIndex) => {
                  if (message.role === "system") {
                    return;
                  }
                  return (
                    <Message from={message.role} key={message.id}>
                      <MessageContent>
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text": // we don't use any reasoning or tool calls in this example
                              return (
                                <Response key={`${message.id}-${i}`}>
                                  {part.text}
                                </Response>
                              );
                            case "tool-extractResumeDataFromUserDescriptionOrFile":
                              return (
                                <div
                                  key={`${message.id}-${i}`}
                                  className="bg-primary space-y-2 text-white font-semibold shadow-lg rounded-lg p-4"
                                >
                                  <div
                                    className={`text-base ${
                                      messages.length - 1 !== msgIndex
                                        ? "text-muted"
                                        : ""
                                    }`}
                                  >
                                    {messages.length - 1 !== msgIndex &&
                                      "(old)"}{" "}
                                    END: Resume is recorded. You can continue
                                    now.
                                  </div>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant={"secondary"}
                                    className="w-full"
                                    disabled={
                                      messages.length - 1 !== msgIndex ||
                                      isSubmitting
                                    }
                                    onClick={handleSubmit}
                                  >
                                    Continue
                                  </Button>
                                </div>
                              );
                            default:
                              return null;
                          }
                        })}
                      </MessageContent>
                    </Message>
                  );
                })
              )}
              {status === "streaming" && <Loader />}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <PromptInput
            onSubmit={handlePromptSubmit}
            className="mt-4"
            globalDrop
            multiple
          >
            <PromptInputBody>
              <PromptInputAttachments>
                {(attachment) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Describe more about you or upload a resume file... "
              />
            </PromptInputBody>
            <PromptInputToolbar>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger className="text-amber-500">
                    <File className="size-5" />
                    <span>Attach a resume</span>
                  </PromptInputActionMenuTrigger>
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments label="Select a resume file" />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
              </PromptInputTools>
              <PromptInputSubmit
                disabled={status === "streaming"}
                status={status}
              />
            </PromptInputToolbar>
          </PromptInput>
        </div>
      </div>
    </>
  );
};

export default ImportExistingResume;
