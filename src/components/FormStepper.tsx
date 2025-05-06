
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

const FormStepper = ({ steps, currentStep, onStepClick }: FormStepperProps) => {
  return (
    <div className="hidden md:flex justify-between">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={cn(
            "flex flex-col items-center relative cursor-pointer",
            index !== steps.length - 1 &&
              "after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-gray-200 after:top-5 after:left-1/2 after:translate-y-0"
          )}
          onClick={() => onStepClick?.(index)}
        >
          <div
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full border-2 relative z-10",
              currentStep === index
                ? "bg-blue-600 border-blue-600 text-white"
                : index < currentStep
                ? "bg-green-600 border-green-600 text-white"
                : "bg-white border-gray-300 text-gray-400",
              "hover:border-blue-400 transition-colors"
            )}
          >
            {index < currentStep ? (
              <Check className="w-5 h-5" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <div className="text-xs mt-2 font-medium text-center">
            {step.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormStepper;
