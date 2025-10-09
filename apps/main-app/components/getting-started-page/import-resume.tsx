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
import { useState } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";
import { Response } from "@/components/ai-elements/response";
import { UseFormReturn } from "react-hook-form";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/schema";
import { Button } from "../ui/button";

const ImportExistingResume = ({
  form,
  chatHistory,
}: {
  form: UseFormReturn<RESUME_SCHEMA_TYPE>;
  chatHistory: UIMessage[];
}) => {
  const { setValue } = form;
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    messages: chatHistory,
  });
  const handleSubmit = (message: PromptInputMessage) => {
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
                messages.map((message) => (
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
                          default:
                            return null;
                        }
                      })}
                    </MessageContent>
                  </Message>
                ))
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <PromptInput
            onSubmit={handleSubmit}
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
              <PromptInputSubmit disabled={!input && !status} status={status} />
            </PromptInputToolbar>
          </PromptInput>
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting || status === "streaming"}
        className="min-w-[180px] sm:min-w-[200px] h-10 sm:h-11 w-full mt-2 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all"
      >
        {form.formState.isSubmitting ? "Creating..." : "Continue"}
      </Button>
    </>
  );
};

export default ImportExistingResume;
