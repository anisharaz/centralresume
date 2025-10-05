"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileUp, FilePlus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";
import { RESUME_ZOD_SCHEMA } from "@centralresume/resume-core/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandleResumeCreation } from "@/app/actions/getting-started";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import ImportExistingResume from "./import-resume";
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
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              Welcome to Central
              <span className="text-yellow-300">#resume</span>
            </h1>
            <p className="text-muted-foreground">
              Let&apos;s get you set up with your basic information
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="new-resume" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="new-resume" className="flex items-center gap-2">
              <FilePlus className="w-4 h-4" />
              Create New Resume
            </TabsTrigger>
            <TabsTrigger
              value="import-resume"
              className="flex items-center gap-2"
            >
              <FileUp className="w-4 h-4" />
              Import Resume
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new-resume">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col items-center justify-center space-y-6 py-12">
                  <div className="text-center space-y-4 max-w-md">
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <FilePlus className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">
                      Create a New Resume
                    </h2>
                    <p className="text-muted-foreground">
                      Start fresh with a blank resume template. You can add your
                      personal details, work experience, education, and more
                      after creation.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center pt-4 pb-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="min-w-[200px]"
                  >
                    {form.formState.isSubmitting
                      ? "Creating..."
                      : "Create New Resume"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </TabsContent>

          <TabsContent value="import-resume">
            <ImportExistingResume />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
