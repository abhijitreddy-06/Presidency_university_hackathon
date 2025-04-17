import { Monitor, Heart, Droplet, Activity } from "lucide-react";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Monitor className="h-8 w-8" />,
    title: "Diabetes Risk Analysis",
    description: "Evaluate your diabetes risk based on medical history, lifestyle, and key health indicators."
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Heart Disease Prediction",
    description: "Assess cardiac health based on cholesterol, blood pressure, ECG results, and other factors."
  },
  {
    icon: <Droplet className="h-8 w-8" />,
    title: "Kidney Disease Screening",
    description: "Analyze kidney function with comprehensive assessment of creatinine, albumin, and other markers."
  },
  {
    icon: <Activity className="h-8 w-8" />,
    title: "Liver Health Evaluation",
    description: "Detect potential liver issues through analysis of bilirubin, enzymes, and protein ratios."
  }
];

export default function FeatureSection() {
  return (
    <section className="bg-neutral-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800">Comprehensive Health Prediction</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            Our platform uses advanced algorithms to analyze your health data and provide accurate risk assessments for multiple conditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
