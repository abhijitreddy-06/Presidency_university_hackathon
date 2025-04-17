import { useState } from "react";
import { z } from "zod";
import PredictionForm from "@/components/prediction-form";
import PredictionResult from "@/components/prediction-result";

// Form schema for kidney disease prediction
const kidneyDiseaseSchema = z.object({
  age: z.number().min(18).max(120),
  bloodPressure: z.number().min(80).max(200),
  creatinine: z.number().min(0.1).max(15),
  albumin: z.number().min(0).max(5),
  bloodSugar: z.number().min(70).max(300),
  hemoglobin: z.number().min(5).max(20),
  urea: z.number().min(5).max(200),
  sodium: z.number().min(120).max(160),
  potassium: z.number().min(2).max(8),
  userId: z.number().optional(),
});

// Form steps for kidney disease prediction
const kidneyDiseaseSteps = [
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
        name: "bloodPressure",
        label: "Blood Pressure (mmHg)",
        type: "number",
        min: 80,
        max: 200,
      },
    ],
  },
  {
    name: "Blood Tests",
    fields: [
      {
        name: "creatinine",
        label: "Serum Creatinine (mg/dL)",
        type: "number",
        min: 0.1,
        max: 15,
        step: 0.1,
      },
      {
        name: "albumin",
        label: "Albumin (g/dL)",
        type: "number",
        min: 0,
        max: 5,
        step: 0.1,
      },
      {
        name: "bloodSugar",
        label: "Blood Sugar (mg/dL)",
        type: "number",
        min: 70,
        max: 300,
      },
      {
        name: "hemoglobin",
        label: "Hemoglobin (g/dL)",
        type: "number",
        min: 5,
        max: 20,
        step: 0.1,
      },
    ],
  },
  {
    name: "Additional Metrics",
    fields: [
      {
        name: "urea",
        label: "Blood Urea (mg/dL)",
        type: "number",
        min: 5,
        max: 200,
      },
      {
        name: "sodium",
        label: "Sodium (mEq/L)",
        type: "number",
        min: 120,
        max: 160,
      },
      {
        name: "potassium",
        label: "Potassium (mEq/L)",
        type: "number",
        min: 2,
        max: 8,
        step: 0.1,
      },
    ],
  },
];

export default function KidneyDisease() {
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
      { text: "Maintain adequate hydration with water (consult your doctor about exact fluid intake)." },
      { text: "Follow a kidney-friendly diet as recommended by healthcare professionals." },
    ];
    
    if (riskPercentage < 40) {
      recommendations.unshift({ text: "Your risk appears low, but regular kidney function monitoring is still recommended." });
    } else if (riskPercentage < 70) {
      recommendations.unshift({ text: "Consider consulting with a nephrologist for a comprehensive kidney health evaluation." });
      recommendations.push({ text: "Monitor your blood pressure regularly and keep it controlled." });
    } else {
      recommendations.unshift({ text: "Schedule a consultation with a nephrologist as soon as possible." });
      recommendations.push({ text: "Discuss medication management and appropriate diet restrictions with your specialist." });
      recommendations.push({ text: "More frequent kidney function monitoring may be necessary." });
    }
    
    return recommendations;
  };
  
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Kidney Disease Risk Assessment</h1>
          <p className="text-neutral-600 mt-2">
            Evaluate your risk of chronic kidney disease based on blood markers and health indicators
          </p>
        </div>
        
        {!showResult ? (
          <PredictionForm
            type="kidney-disease"
            title="Chronic Kidney Disease Assessment"
            schema={kidneyDiseaseSchema}
            steps={kidneyDiseaseSteps}
            onResult={handlePredictionResult}
          />
        ) : (
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Chronic Kidney Disease Assessment</h2>
            </div>
            <div className="p-6">
              <PredictionResult
                type="kidney-disease"
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
