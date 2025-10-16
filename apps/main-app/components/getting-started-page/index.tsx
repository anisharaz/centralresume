"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, FilePlus } from "lucide-react";
import gspaper from "@/public/gettingstarted-paper.gif";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import ImportExistingResume from "./import-resume";
import Image from "next/image";
import { UIMessage } from "ai";
import { HandleResumeCreation } from "@/app/actions/getting-started";
import { useState } from "react";
export default function GettingStartedForm({
  defaultData,
  chatHistory,
}: {
  defaultData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  chatHistory: UIMessage[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeData, setResumeData] = useState<RESUME_SCHEMA_TYPE>({
    version: "1.0.0",
    personal_details: {
      name: defaultData.firstName + " " + defaultData.lastName,
      email: defaultData.email,
      tag_line: [
        {
          text: "Computer science student at ..(edit me)..",
          tags: [{ tag: "#common" }],
        },
      ],
      summary: [],
      social_links: [],
      address: {
        address_line: "",
        city: "",
        country: "",
      },
    },
    work_experience: [],
    skills: {
      soft: [],
      technical: [],
    },
    projects: [],
    achievements: [],
    education: [],
    publications: [],
    otherLists: [],
  });
  const handleSubmit = async () => {
    console.log(resumeData);
    // setIsSubmitting(true);
    // const res = await HandleResumeCreation({ resumeData: resumeData });
    // if (!res.success) {
    //   alert("Failed to submit resume data. Please try again.");
    //   return;
    // }
    // cookies.set("currentTag", "#common", {
    //   expires: new Date(2050, 0, 1),
    // });
    // alert("Resume data submitted successfully!");
    // setIsSubmitting(false);
    // router.push("/user/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {/* Header Section */}
        <div className="text-center space-y-3 sm:space-y-4 mb-4">
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Getting started with Central
              <span className="text-yellow-400 dark:text-yellow-300">
                #resume
              </span>
            </h1>
          </div>
        </div>
        {/* Tabs Section */}
        <Tabs defaultValue="import-resume" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-2 h-auto p-1">
            <TabsTrigger
              value="new-resume"
              className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 text-xs sm:text-sm"
            >
              <FilePlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Create New Resume</span>
              <span className="sm:hidden">Create New</span>
            </TabsTrigger>
            <TabsTrigger
              value="import-resume"
              className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 text-xs sm:text-sm"
            >
              <FileUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Import Resume</span>
              <span className="sm:hidden">Import</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new-resume" className="mt-0">
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 py-6 sm:py-8 lg:py-10">
              <div className="text-center space-y-3 sm:space-y-4 max-w-lg px-4">
                <div className="mx-auto w-16 h-16 sm:w-36 sm:h-36  bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center shadow-md">
                  <Image src={gspaper} alt="" />
                </div>
                <div className="space-y-2 sm:space-y-2.5">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight">
                    Start Fresh
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    You can later edit and add more details.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-2 sm:pt-4 pb-4 sm:pb-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="min-w-[180px] sm:min-w-[200px] h-10 sm:h-11 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all"
              >
                {isSubmitting ? "Creating..." : "Continue"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="import-resume" className="mt-0">
            <ImportExistingResume
              chatHistory={chatHistory}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
              setResumeData={setResumeData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
