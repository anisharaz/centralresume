"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { PersonalDetailsForm } from "@/components/getting-started-form/form-steps/personal-details-form";
import { EducationForm } from "@/components/getting-started-form/form-steps/education-form";
import { ExperienceForm } from "@/components/getting-started-form/form-steps/experience-form";
import { SkillsForm } from "@/components/getting-started-form/form-steps/skills-form";
import { formSchema } from "@/lib/zod/schemas";

export type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: "personal", title: "Personal Details" },
  { id: "education", title: "Education" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
];

export function GetStartedForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      headline: "",
      about: "",
      education: [{}],
      experience: [{}],
      skills: [],
    },
    mode: "onChange",
  });

  function onSubmit(data: FormValues) {
    // In a real app, you would save this data to a database
    console.log(data);

    // Store the form data in localStorage for the profile page to use
    localStorage.setItem("profileData", JSON.stringify(data));

    // Navigate to the profile page
    router.push("/profile");
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const skipStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium">
                {steps[currentStep].title}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            <Progress value={progress} className="h-2 mt-2" />
          </CardHeader>
          <CardContent className="p-6">
            {currentStep === 0 && <PersonalDetailsForm form={form} />}
            {currentStep === 1 && <EducationForm form={form} />}
            {currentStep === 2 && <ExperienceForm form={form} />}
            {currentStep === 3 && <SkillsForm form={form} />}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={previousStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {currentStep < steps.length - 1 && (
                <Button type="button" variant="outline" onClick={skipStep}>
                  Skip
                </Button>
              )}
              <Button type="button" onClick={nextStep}>
                {currentStep < steps.length - 1 ? "Next" : "Complete"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
