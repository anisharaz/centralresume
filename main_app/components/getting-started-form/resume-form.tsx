"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ENGINEERING_RESUME,
  type ENGINEERING_RESUME_TYPE,
} from "@/lib/zod/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PersonalDetailsForm } from "./steps/personal-details-form";
import { WorkExperienceForm } from "./steps/work-experience-form";
import { SkillsForm } from "./steps/skills-form";
import { AchievementsForm } from "./steps/achievements-form";
import { EducationForm } from "./steps/education-form";
import { PublicationsForm } from "./steps/publications-form";
import { OtherListsForm } from "./steps/other-lists-form";
import { ReviewForm } from "./steps/review-form";
import { StepIndicator } from "./step-indicator";
import { HandleResumeCreation } from "@/app/actions/getting-started";

const steps = [
  { id: "personal", label: "Personal Details" },
  { id: "work", label: "Work Experience" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "publications", label: "Publications" },
  { id: "other", label: "Other Lists" },
  { id: "review", label: "Review" },
];

export function ResumeForm() {
  const [currentStep, setCurrentStep] = useState(0);

  // Initialize form with default values
  const form = useForm<ENGINEERING_RESUME_TYPE>({
    resolver: zodResolver(ENGINEERING_RESUME),
    defaultValues: {
      version: "1.0.0",
      work_experience: [],
      skills: {
        soft: [],
        technical: [],
      },
      achievements: [],
      education: [],
      publications: [],
      otherLists: [],
    },
    mode: "onChange",
  });

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: ENGINEERING_RESUME_TYPE) => {
    console.log("Form submitted:", data);
    await HandleResumeCreation({ resumeData: data });
    alert("Resume data submitted successfully!");
  };

  return (
    <div className="space-y-16 container mx-auto mt-6">
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      <Card>
        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (d) => {
                alert(
                  "Required fields are missing and marked in red, please check the form."
                );
              })}
            >
              {currentStep === 0 && <PersonalDetailsForm form={form} />}
              {currentStep === 1 && <WorkExperienceForm form={form} />}
              {currentStep === 2 && <SkillsForm form={form} />}
              {currentStep === 3 && <AchievementsForm form={form} />}
              {currentStep === 4 && <EducationForm form={form} />}
              {currentStep === 5 && <PublicationsForm form={form} />}
              {currentStep === 6 && <OtherListsForm form={form} />}
              {currentStep === 7 && <ReviewForm form={form} />}

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStep === 7}
                    variant={"outline"}
                  >
                    Next
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
