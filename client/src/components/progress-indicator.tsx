interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressIndicator({ currentStep, totalSteps, steps }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="bg-neutral-100 px-6 py-2">
      <div className="flex justify-between text-xs text-neutral-600">
        {steps.map((step, index) => (
          <span key={index} className={index < currentStep ? "text-primary font-medium" : ""}>
            {step}
          </span>
        ))}
      </div>
      <div className="h-2 w-full bg-neutral-200 rounded-full mt-1">
        <div 
          className="h-2 bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
