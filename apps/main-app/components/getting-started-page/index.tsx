"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, FilePlus } from "lucide-react";
import gspaper from "@/public/gettingstarted-paper.gif";
import { FormProvider, useForm } from "react-hook-form";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";
import { RESUME_ZOD_SCHEMA } from "@centralresume/resume-core/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandleResumeCreation } from "@/app/actions/getting-started";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import ImportExistingResume from "./import-resume";
import Image from "next/image";
export default function GettingStartedFormV2({
  defaultData,
}: {
  defaultData: {
    firstName: string;
    lastName: string;
    email: string;
  };
}) {
  const router = useRouter();
  const form = useForm<RESUME_SCHEMA_TYPE>({
    resolver: zodResolver(RESUME_ZOD_SCHEMA),
    defaultValues: {
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
    },
    mode: "all",
  });

  const onSubmit = async (data: RESUME_SCHEMA_TYPE) => {
    const isValid = await form.trigger();
    if (!isValid) {
      // Show validation errors and prevent submission
      console.log("Form validation failed:", form.formState.errors);
      return;
    }
    const res = await HandleResumeCreation({ resumeData: data });
    if (!res.success) {
      alert("Failed to submit resume data. Please try again.");
      return;
    }
    cookies.set("currentTag", "#common", {
      expires: new Date(2050, 0, 1),
    });
    alert("Resume data submitted successfully!");
    router.push("/user/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header Section */}
        <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 lg:mb-10">
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Welcome to Central
              <span className="text-yellow-400 dark:text-yellow-300">
                #resume
              </span>
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground max-w-xl mx-auto">
              Let&apos;s get you set up with your resume in just a few clicks
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="new-resume" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6 sm:mb-8 h-auto p-1">
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
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 py-6 sm:py-8 lg:py-10">
                  <div className="text-center space-y-3 sm:space-y-4 max-w-lg px-4">
                    <div className="mx-auto w-16 h-16 sm:w-36 sm:h-36  bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center shadow-md">
                      <Image src={gspaper} alt="" />
                    </div>
                    <div className="space-y-2 sm:space-y-2.5">
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight">
                        Start Fresh
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center pt-2 sm:pt-4 pb-4 sm:pb-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="min-w-[180px] sm:min-w-[200px] h-10 sm:h-11 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    {form.formState.isSubmitting ? "Creating..." : "Finish"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </TabsContent>

          <TabsContent value="import-resume" className="mt-0">
            <ImportExistingResume form={form} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
