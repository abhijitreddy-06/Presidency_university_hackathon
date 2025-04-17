import HeroSection from "@/components/hero-section";
import FeatureSection from "@/components/feature-section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Monitor, Heart, Droplet, Activity, Check } from "lucide-react";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      
      {/* Prediction Hub Section */}
      <section id="prediction-hub-preview" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800">Disease Prediction Hub</h2>
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
          </div>
          
          <div className="text-center mt-12">
            <Link href="/prediction-hub">
              <Button className="bg-gradient-to-r from-primary to-[#008080] hover:opacity-90">
                View All Health Assessment Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Diet & Exercise Preview */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800">Personalized Health Plans</h2>
            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
              Get customized diet and exercise recommendations based on your health profile
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Healthy meal for health management" 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Personalized Diet Plans</h3>
                <p className="text-neutral-600 mb-4">
                  Receive tailored nutrition advice designed specifically for your health risks and personal profile.
                </p>
                <Link href="/diet">
                  <Button className="bg-gradient-to-r from-primary to-[#008080] hover:opacity-90">
                    Explore Diet Plans
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Exercise plan" 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Customized Exercise Programs</h3>
                <p className="text-neutral-600 mb-4">
                  Get activity recommendations that match your fitness level and help manage your specific health concerns.
                </p>
                <Link href="/exercise">
                  <Button className="bg-gradient-to-r from-primary to-[#008080] hover:opacity-90">
                    Discover Exercise Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-[#008080] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Create your free account today and get personalized health insights, recommendations, and tracking tools.
          </p>
          <Link href="/get-started">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-neutral-100 border-white">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
