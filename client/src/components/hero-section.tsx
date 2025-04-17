import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight">
              Predict Health Risks with <span className="text-primary">AI-Powered</span> Precision
            </h1>
            <p className="text-neutral-600 text-lg">
              HealthPredict offers comprehensive disease risk assessment for diabetes, heart disease, kidney disease, and liver conditions. Get personalized health insights and recommendations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link href="/prediction-hub">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-[#008080] hover:opacity-90 transition-all">
                  Check Your Health Risk
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white transition-all">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Doctor with digital healthcare interface" 
              className="rounded-lg shadow-lg w-full"
              width="600"
              height="400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
