"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Rocket, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { RESUME_ZOD_SCHEMA, RESUME_TYPE } from "@/lib/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalDetailsForm } from "./personal-detail-form";
import { HandleResumeCreation } from "@/app/actions/getting-started";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  const [currentStage, setCurrentStage] = useState(0);
  const form = useForm<RESUME_TYPE>({
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

  const onSubmit = async (data: RESUME_TYPE) => {
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
    alert("Resume data submitted successfully!");
    router.push("/user/profile");
  };

  const totalStages = 2;
  const progress = ((currentStage + 1) / totalStages) * 100;

  const handleNext = () => {
    if (currentStage < totalStages - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const renderStage = () => {
    switch (currentStage) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                Welcome to Central
                <span className="text-yellow-300">#resume</span>
              </h2>
              <p className="text-muted-foreground">
                We&apos;re excited to have you here. Let&apos;s get you set up
                in just a few simple steps.
              </p>
            </div>
            <Button onClick={handleNext} size="lg" className="w-full sm:w-auto">
              Start
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-2">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-green-600" />
            </div>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (err) => {
                  toast.error("Required fields have red titles", {
                    description: "fill in the required fields to proceed.",
                    duration: 5000,
                  });
                })}
                className="space-y-4"
              >
                <PersonalDetailsForm form={form} />
                <Button
                  type="submit"
                  className="w-full"
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
              </form>
            </FormProvider>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-center">Getting Started</CardTitle>
              <CardDescription className="text-center">
                Step {currentStage + 1} of {totalStages}
              </CardDescription>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent>{renderStage()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
