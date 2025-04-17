import { useState } from "react";
import { z } from "zod";
import PredictionForm from "@/components/prediction-form";
import PredictionResult from "@/components/prediction-result";

// Form schema for liver disease prediction
const liverDiseaseSchema = z.object({
  age: z.number().min(18).max(120),
  gender: z.string().min(1),
  totalBilirubin: z.number().min(0.1).max(30),
  directBilirubin: z.number().min(0.1).max(20),
  alkalinePhosphatase: z.number().min(20).max(800),
  alt: z.number().min(1).max(500),
  ast: z.number().min(1).max(500),
  totalProteins: z.number().min(2).max(12),
  albuminGlobulinRatio: z.number().min(0.1).max(5),
  userId: z.number().optional(),
});

// Form steps for liver disease prediction
const liverDiseaseSteps = [
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
    name: "Bilirubin Levels",
    fields: [
      {
        name: "totalBilirubin",
        label: "Total Bilirubin (mg/dL)",
        type: "number",
        min: 0.1,
        max: 30,
        step: 0.1,
      },
      {
        name: "directBilirubin",
        label: "Direct Bilirubin (mg/dL)",
        type: "number",
        min: 0.1,
        max: 20,
        step: 0.1,
      },
      {
        name: "alkalinePhosphatase",
        label: "Alkaline Phosphatase (IU/L)",
        type: "number",
        min: 20,
        max: 800,
      },
    ],
  },
  {
    name: "Enzyme & Protein Levels",
    fields: [
      {
        name: "alt",
        label: "ALT (IU/L)",
        type: "number",
        min: 1,
        max: 500,
      },
      {
        name: "ast",
        label: "AST (IU/L)",
        type: "number",
        min: 1,
        max: 500,
      },
      {
        name: "totalProteins",
        label: "Total Proteins (g/dL)",
        type: "number",
        min: 2,
        max: 12,
        step: 0.1,
      },
      {
        name: "albuminGlobulinRatio",
        label: "Albumin/Globulin Ratio",
        type: "number",
        min: 0.1,
        max: 5,
        step: 0.1,
      },
    ],
  },
];

export default function LiverDisease() {
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
      { text: "Limit alcohol consumption or avoid it completely if recommended by your doctor." },
      { text: "Maintain a balanced diet rich in fruits, vegetables, and whole grains." },
    ];
    
    if (riskPercentage < 40) {
      recommendations.unshift({ text: "Your liver function appears normal, but continue with regular health check-ups." });
    } else if (riskPercentage < 70) {
      recommendations.unshift({ text: "Consider consulting with a hepatologist for a comprehensive liver health evaluation." });
      recommendations.push({ text: "Avoid medications that may stress the liver without doctor supervision." });
    } else {
      recommendations.unshift({ text: "Schedule a consultation with a hepatologist as soon as possible." });
      recommendations.push({ text: "Follow strict dietary guidelines as recommended by your healthcare provider." });
      recommendations.push({ text: "More frequent liver function monitoring may be necessary." });
    }
    
    return recommendations;
  };
  
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Liver Health Evaluation</h1>
          <p className="text-neutral-600 mt-2">
            Assess liver function and detect early signs of potential liver disease
          </p>
        </div>
        
        {!showResult ? (
          <PredictionForm
            type="liver-disease"
            title="Liver Health Evaluation"
            schema={liverDiseaseSchema}
            steps={liverDiseaseSteps}
            onResult={handlePredictionResult}
          />
        ) : (
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Liver Health Evaluation</h2>
            </div>
            <div className="p-6">
              <PredictionResult
                type="liver-disease"
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
