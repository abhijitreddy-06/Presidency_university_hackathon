import { useState, ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProgressIndicator from "@/components/progress-indicator";

interface PredictionFormProps {
  type: "diabetes" | "heart-disease" | "kidney-disease" | "liver-disease";
  title: string;
  schema: z.ZodObject<any>;
  steps: {
    name: string;
    fields: {
      name: string;
      label: string;
      type: "text" | "number" | "select";
      options?: { value: string; label: string }[];
      placeholder?: string;
      min?: number;
      max?: number;
      step?: number;
    }[];
  }[];
  onResult: (result: any) => void;
}

export default function PredictionForm({ type, title, schema, steps, onResult }: PredictionFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Create initial defaults to prevent NaN errors
  const initialDefaults: any = {};
  
  // Set default values for each field
  steps.forEach(step => {
    step.fields.forEach(field => {
      if (field.type === "number") {
        // For number fields, use the midpoint between min and max if defined, or 0
        const min = field.min !== undefined ? field.min : 0;
        const max = field.max !== undefined ? field.max : 100;
        initialDefaults[field.name] = (min + max) / 2;
      } else if (field.type === "select" && field.options && field.options.length > 0) {
        // For select fields, use the first option value as default
        const value = field.options[0].value;
        // Handle boolean fields
        if (value === "true") {
          initialDefaults[field.name] = true;
        } else if (value === "false") {
          initialDefaults[field.name] = false;
        } else {
          initialDefaults[field.name] = value;
        }
      } else {
        // For other fields, use empty string
        initialDefaults[field.name] = "";
      }
    });
  });
  
  // Create form with calculated defaults
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialDefaults
  });
  
  // Setup mutation for form submission
  const prediction = useMutation({
    mutationFn: async (data: z.infer<typeof schema>) => {
      console.log("Submitting data:", data);
      const response = await apiRequest("POST", `/api/predictions/${type}`, data);
      const result = await response.json();
      console.log("Received response:", result);
      return result;
    },
    onSuccess: (data) => {
      console.log("Success callback with data:", data);
      setIsSubmitting(false);
      onResult(data);
    },
    onError: (error) => {
      console.error("Error in prediction mutation:", error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: error.message || "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Handle form submission
  function onSubmit(data: z.infer<typeof schema>) {
    // Process the data - convert string booleans to actual booleans
    const processedData = { ...data };
    steps.forEach(step => {
      step.fields.forEach(field => {
        if (field.type === "select" && field.options) {
          const hasBoolean = field.options.some(opt => opt.value === "true" || opt.value === "false");
          if (hasBoolean && typeof processedData[field.name] === "string") {
            processedData[field.name] = processedData[field.name] === "true";
          }
        }
      });
    });
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      prediction.mutate(processedData);
    }
  }
  
  // Step navigation
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Get step names for progress indicator
  const stepNames = steps.map(step => step.name);
  if (!stepNames.includes("Results")) {
    stepNames.push("Results");
  }
  
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      
      {/* Progress Indicator */}
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={steps.length + 1} // +1 for results step
        steps={stepNames}
      />
      
      {/* Form */}
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {steps.map((step, stepIndex) => (
              <div key={stepIndex} className={stepIndex + 1 === currentStep ? "" : "hidden"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {step.fields.map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-neutral-700">
                            {field.label}
                          </FormLabel>
                          <FormControl>
                            {field.type === "select" ? (
                              <Select
                                onValueChange={formField.onChange}
                                defaultValue={formField.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {field.options?.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                type={field.type}
                                placeholder={field.placeholder}
                                min={field.min}
                                max={field.max}
                                step={field.step}
                                {...formField}
                                onChange={(e) => 
                                  field.type === "number" 
                                    ? formField.onChange(e.target.valueAsNumber) 
                                    : formField.onChange(e.target.value)
                                }
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                
                <div className="pt-4 flex space-x-4">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-1/2 border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={goToPreviousStep}
                    >
                      Back
                    </Button>
                  )}
                  <Button 
                    type="button"
                    className={`${currentStep === 1 ? "w-full" : "w-1/2"} bg-gradient-to-r from-primary to-[#008080] hover:opacity-90`}
                    onClick={() => onSubmit(form.getValues())}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : currentStep < steps.length ? (
                      "Continue"
                    ) : (
                      "Calculate Risk"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </form>
        </Form>
      </div>
    </div>
  );
}
