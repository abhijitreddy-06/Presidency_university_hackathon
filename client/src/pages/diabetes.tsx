import { useState } from "react";
import { z } from "zod";
import PredictionForm from "@/components/prediction-form";
import PredictionResult from "@/components/prediction-result";

// Form schema for diabetes prediction
const diabetesSchema = z.object({
  age: z.number().min(18).max(120),
  gender: z.string().min(1),
  familyHistory: z.boolean(),
  glucose: z.number().min(70).max(300),
  bmi: z.number().min(15).max(50),
  bloodPressure: z.number().min(80).max(200),
  insulin: z.number().min(0).max(300),
  userId: z.number().optional(),
  riskPercentage: z.number().optional(), // Add this to match server schema
});

// Form steps for diabetes prediction
const diabetesSteps = [
  {
    name: "Personal Information",
    fields: [
      {
        name: "age",
        label: "Age",
        type: "number" as const,
        min: 18,
        max: 120,
      },
      {
        name: "gender",
        label: "Gender",
        type: "select" as const,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "familyHistory",
        label: "Family History of Diabetes",
        type: "select" as const,
        options: [
          { value: "true", label: "Yes" },
          { value: "false", label: "No" },
        ],
      },
    ],
  },
  {
    name: "Health Metrics",
    fields: [
      {
        name: "glucose",
        label: "Glucose Level (mg/dL)",
        type: "number" as const,
        min: 70,
        max: 300,
      },
      {
        name: "bmi",
        label: "Body Mass Index (BMI)",
        type: "number" as const,
        min: 15,
        max: 50,
        step: 0.1,
      },
      {
        name: "bloodPressure",
        label: "Blood Pressure (mmHg)",
        type: "number" as const,
        min: 80,
        max: 200,
      },
      {
        name: "insulin",
        label: "Insulin Level (µU/mL)",
        type: "number" as const,
        min: 0,
        max: 300,
      },
    ],
  },
];

export default function Diabetes() {
  const [showResult, setShowResult] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  
  // Function to handle form result
  const handlePredictionResult = (result: any) => {
    setPredictionResult(result);
    setShowResult(true);
  };
  
  // Function to handle start over
  const handleStartOver = () => {
    setShowResult(false);
    setPredictionResult(null);
  };
  
  // Define recommendations based on risk percentage
  const getRecommendations = (riskPercentage: number) => {
    let recommendations = [
      { text: "Maintain a balanced diet low in refined carbohydrates and sugars." },
      { text: "Aim for at least 150 minutes of moderate exercise weekly." },
    ];
    
    if (riskPercentage < 40) {
      recommendations.unshift({ text: "Your risk is low, but continue monitoring your health with regular check-ups." });
    } else if (riskPercentage < 70) {
      recommendations.unshift({ text: "Consider scheduling an appointment with your primary care provider for a comprehensive evaluation." });
    } else {
      recommendations.unshift({ text: "Consider scheduling a consultation with an endocrinologist for a comprehensive evaluation." });
      recommendations.push({ text: "More frequent blood glucose monitoring is recommended." });
    }
    
    return recommendations;
  };
  
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Diabetes Risk Assessment</h1>
          <p className="text-neutral-600 mt-2">
            Evaluate your risk of developing diabetes based on health metrics and lifestyle factors
          </p>
        </div>
        
        {!showResult ? (
          <PredictionForm
            type="diabetes"
            title="Diabetes Risk Assessment"
            schema={diabetesSchema}
            steps={diabetesSteps}
            onResult={handlePredictionResult}
          />
        ) : (
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Diabetes Risk Assessment</h2>
            </div>
            <div className="p-6">
              <PredictionResult
                type="diabetes"
                riskPercentage={predictionResult.riskPercentage}
                recommendations={getRecommendations(predictionResult.riskPercentage)}
                onStartOver={handleStartOver}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
