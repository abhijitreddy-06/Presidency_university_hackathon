import { useState } from "react";
import { z } from "zod";
import PredictionForm from "@/components/prediction-form";
import PredictionResult from "@/components/prediction-result";

// Form schema for heart disease prediction
const heartDiseaseSchema = z.object({
  age: z.number().min(18).max(120),
  gender: z.string().min(1),
  chestPainType: z.string().min(1),
  cholesterol: z.number().min(100).max(600),
  maxHeartRate: z.number().min(60).max(220),
  bloodPressure: z.number().min(80).max(200),
  fastingBloodSugar: z.number().min(70).max(300),
  exerciseAngina: z.boolean(),
  userId: z.number().optional(),
});

// Form steps for heart disease prediction
const heartDiseaseSteps = [
  {
    name: "Personal Information",
    fields: [
      {
        name: "age",
        label: "Age",
        type: "number",
        min: 18,
        max: 120,
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    name: "Cardiac Metrics",
    fields: [
      {
        name: "chestPainType",
        label: "Chest Pain Type",
        type: "select",
        options: [
          { value: "typical", label: "Typical Angina" },
          { value: "atypical", label: "Atypical Angina" },
          { value: "nonanginal", label: "Non-Anginal Pain" },
          { value: "asymptomatic", label: "Asymptomatic" },
        ],
      },
      {
        name: "cholesterol",
        label: "Cholesterol Level (mg/dL)",
        type: "number",
        min: 100,
        max: 600,
      },
      {
        name: "maxHeartRate",
        label: "Maximum Heart Rate (bpm)",
        type: "number",
        min: 60,
        max: 220,
      },
      {
        name: "bloodPressure",
        label: "Systolic Blood Pressure (mmHg)",
        type: "number",
        min: 80,
        max: 200,
      },
      {
        name: "fastingBloodSugar",
        label: "Fasting Blood Sugar (mg/dL)",
        type: "number",
        min: 70,
        max: 300,
      },
      {
        name: "exerciseAngina",
        label: "Exercise-Induced Angina",
        type: "select",
        options: [
          { value: "true", label: "Yes" },
          { value: "false", label: "No" },
        ],
      },
    ],
  },
];

export default function HeartDisease() {
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
      { text: "Follow a heart-healthy diet rich in fruits, vegetables, whole grains, and lean proteins." },
      { text: "Engage in regular cardiovascular exercise as recommended by your healthcare provider." },
    ];
    
    if (riskPercentage < 40) {
      recommendations.unshift({ text: "Your risk is low, but continue healthy lifestyle habits and regular check-ups." });
    } else if (riskPercentage < 70) {
      recommendations.unshift({ text: "Consider consulting with a cardiologist for a comprehensive heart health evaluation." });
      recommendations.push({ text: "Monitor your blood pressure and cholesterol levels regularly." });
    } else {
      recommendations.unshift({ text: "Schedule a consultation with a cardiologist as soon as possible." });
      recommendations.push({ text: "Discuss stress management techniques with your healthcare provider." });
      recommendations.push({ text: "Consider more frequent cardiac monitoring if recommended by your doctor." });
    }
    
    return recommendations;
  };
  
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Heart Disease Risk Assessment</h1>
          <p className="text-neutral-600 mt-2">
            Evaluate your risk of heart disease based on clinical indicators and lifestyle factors
          </p>
        </div>
        
        {!showResult ? (
          <PredictionForm
            type="heart-disease"
            title="Heart Disease Risk Assessment"
            schema={heartDiseaseSchema}
            steps={heartDiseaseSteps}
            onResult={handlePredictionResult}
          />
        ) : (
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Heart Disease Risk Assessment</h2>
            </div>
            <div className="p-6">
              <PredictionResult
                type="heart-disease"
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
