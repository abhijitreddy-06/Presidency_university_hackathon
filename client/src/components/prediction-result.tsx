import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import RiskGauge from "./risk-gauge";

interface Recommendation {
  text: string;
}

interface PredictionResultProps {
  type: "diabetes" | "heart-disease" | "kidney-disease" | "liver-disease";
  riskPercentage: number;
  recommendations: Recommendation[];
  onStartOver: () => void;
}

export default function PredictionResult({ 
  type, 
  riskPercentage, 
  recommendations, 
  onStartOver 
}: PredictionResultProps) {
  // Determine risk category
  let riskCategory = "Low Risk";
  if (riskPercentage >= 70) {
    riskCategory = "High Risk";
  } else if (riskPercentage >= 40) {
    riskCategory = "Moderate Risk";
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-block p-4 bg-neutral-100 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-neutral-800">
          Your {type.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")} Risk Assessment
        </h3>
      </div>
      
      {/* Risk Gauge */}
      <RiskGauge riskPercentage={riskPercentage} riskCategory={riskCategory} />
      
      {/* Recommendations */}
      <div className="bg-neutral-100 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-neutral-800 mb-3">Recommendations</h4>
        <ul className="space-y-2 text-neutral-600">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>{recommendation.text}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <Link href="/diet" className="w-1/2">
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
              View Diet Plans
            </Button>
          </Link>
          <Link href="/exercise" className="w-1/2">
            <Button className="w-full bg-gradient-to-r from-primary to-[#008080] hover:opacity-90">
              Exercise Recommendations
            </Button>
          </Link>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            variant="default" 
            className="w-1/2 bg-gradient-to-r from-[#008080] to-primary hover:opacity-90"
            onClick={() => {
              const health = {
                diabetesRisk: type === "diabetes" ? riskPercentage : undefined,
                heartDiseaseRisk: type === "heart-disease" ? riskPercentage : undefined,
                kidneyDiseaseRisk: type === "kidney-disease" ? riskPercentage : undefined,
                liverDiseaseRisk: type === "liver-disease" ? riskPercentage : undefined,
                age: 45, // This would normally come from the form data
                gender: "female", // This would normally come from the form data
              };
              
              // Store in sessionStorage to access in diet page
              sessionStorage.setItem('healthProfile', JSON.stringify(health));
              window.location.href = '/diet?personalized=true';
            }}
          >
            Get Personalized Diet Plan
          </Button>
          <Button 
            variant="default" 
            className="w-1/2 bg-gradient-to-r from-[#008080] to-primary hover:opacity-90"
            onClick={() => {
              const health = {
                diabetesRisk: type === "diabetes" ? riskPercentage : undefined,
                heartDiseaseRisk: type === "heart-disease" ? riskPercentage : undefined,
                kidneyDiseaseRisk: type === "kidney-disease" ? riskPercentage : undefined,
                liverDiseaseRisk: type === "liver-disease" ? riskPercentage : undefined,
                age: 45, // This would normally come from the form data
                gender: "female", // This would normally come from the form data
              };
              
              // Store in sessionStorage to access in exercise page
              sessionStorage.setItem('healthProfile', JSON.stringify(health));
              window.location.href = '/exercise?personalized=true';
            }}
          >
            Get Personalized Exercise Plan
          </Button>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <Button variant="link" onClick={onStartOver} className="text-primary hover:text-primary-dark">
          Start Over
        </Button>
      </div>
    </div>
  );
}
