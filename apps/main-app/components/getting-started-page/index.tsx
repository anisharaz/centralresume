"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/types";
import { RESUME_ZOD_SCHEMA } from "@centralresume/resume-core/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalDetailsForm } from "./personal-detail-form";
import { HandleResumeCreation } from "@/app/actions/getting-started";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import cookies from "js-cookie";
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

        {/* Form Section */}
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (err) => {
              toast.error("Required fields have red titles", {
                description: "fill in the required fields to proceed.",
                duration: 5000,
              });
            })}
            className="space-y-6"
          >
            <PersonalDetailsForm form={form} />
            <div className="sticky bottom-0 bg-background pt-4 pb-6 border-t">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                  form.formState.isSubmitting ||
                  !form.getValues("personal_details.name") ||
                  !form.getValues("personal_details.email")
                }
              >
                {form.formState.isSubmitting
                  ? "Submitting..."
                  : "Complete Setup"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
