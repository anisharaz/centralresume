import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  setCurrentStep,
}: StepIndicatorProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative cursor-pointer flex flex-col items-center"
            onClick={() => setCurrentStep(index)}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary z-10 bg-background",
                index <= currentStep ? "bg-primary text-primary-foreground" : ""
              )}
            >
              <span>{index + 1}</span>
            </div>
            <span className="absolute mt-12 text-xs font-medium text-center w-20">
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute top-5 left-0 h-0.5 w-full bg-muted -z-10">
        <div
          className="absolute h-0.5 bg-primary transition-all"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
