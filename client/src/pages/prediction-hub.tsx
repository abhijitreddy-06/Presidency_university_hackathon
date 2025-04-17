import { Link } from "wouter";
import { Monitor, Heart, Droplet, Activity, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PredictionHub() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-neutral-800">Disease Prediction Hub</h1>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            Select a prediction module to assess your risk for common health conditions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Diabetes Module */}
          <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden">
            <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
            <div className="relative flex items-start">
              <Monitor className="h-8 w-8 text-primary mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-neutral-800">Diabetes Risk Assessment</h3>
                <p className="text-neutral-600 mt-2">
                  Evaluate your risk of developing diabetes based on key health metrics and lifestyle factors.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    Blood glucose analysis
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    BMI evaluation
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    Family history consideration
                  </li>
                </ul>
                <Link href="/diabetes">
                  <Button className="mt-6 bg-gradient-to-r from-primary to-[#008080] hover:opacity-90">
                    Check Diabetes Risk
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Heart Disease Module */}
          <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden">
            <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
            <div className="relative flex items-start">
              <Heart className="h-8 w-8 text-primary mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-neutral-800">Heart Disease Prediction</h3>
                <p className="text-neutral-600 mt-2">
                  Analyze your cardiac health risk based on clinical indicators and lifestyle factors.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    Cholesterol evaluation
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    Blood pressure analysis
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    ECG pattern recognition
                  </li>
                </ul>
                <Link href="/heart-disease">
                  <Button className="mt-6 bg-gradient-to-r from-primary to-[#008080] hover:opacity-90">
                    Check Heart Disease Risk
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Kidney Disease Module */}
          <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden">
            <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
            <div className="relative flex items-start">
              <Droplet className="h-8 w-8 text-primary mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-neutral-800">Chronic Kidney Disease Assessment</h3>
                <p className="text-neutral-600 mt-2">
                  Evaluate kidney function and detect early signs of chronic kidney disease.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    Creatinine level analysis
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    Albumin evaluation
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    Electrolyte balance check
                  </li>
                </ul>
                <Link href="/kidney-disease">
                  <Button className="mt-6 bg-gradient-to-r from-primary to-[#008080] hover:opacity-90">
                    Check Kidney Disease Risk
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Liver Disease Module */}
          <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden">
            <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
            <div className="relative flex items-start">
              <Activity className="h-8 w-8 text-primary mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-neutral-800">Liver Health Evaluation</h3>
                <p className="text-neutral-600 mt-2">
                  Assess liver function and detect early signs of potential liver disease.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    Bilirubin level assessment
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    Liver enzyme analysis
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    Protein ratio evaluation
                  </li>
                </ul>
                <Link href="/liver-disease">
                  <Button className="mt-6 bg-gradient-to-r from-primary to-[#008080] hover:opacity-90">
                    Check Liver Health
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
