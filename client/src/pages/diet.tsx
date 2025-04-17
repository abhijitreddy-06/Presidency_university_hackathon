import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateDietRecommendations } from "@/lib/openai";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DietCard from "@/components/diet-card";
import { Loader2, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Diet() {
  const [isLoading, setIsLoading] = useState(false);
  const [personalizedPlan, setPersonalizedPlan] = useState<any>(null);
  const { toast } = useToast();
  const [location] = useLocation();
  
  // Default health profile (used if no personalized data is available)
  const defaultHealthProfile = {
    diabetesRisk: 65,
    heartDiseaseRisk: 45,
    kidneyDiseaseRisk: 30,
    liverDiseaseRisk: 20,
    age: 45,
    gender: "female",
  };
  
  // Try to get health profile from sessionStorage
  const [healthProfile, setHealthProfile] = useState(defaultHealthProfile);
  
  useEffect(() => {
    // Check if we should generate a personalized plan
    const queryParams = new URLSearchParams(window.location.search);
    const isPersonalized = queryParams.get('personalized') === 'true';
    
    // Try to get stored health profile
    try {
      const storedProfile = sessionStorage.getItem('healthProfile');
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setHealthProfile(parsedProfile);
        
        // Automatically generate personalized plan if the URL parameter is set
        if (isPersonalized) {
          dietRecommendation.mutate();
        }
      }
    } catch (error) {
      console.error("Failed to parse stored health profile:", error);
    }
  }, [location]);
  
  // Diet plans (would normally be generated from OpenAI)
  const dietPlans = [
    {
      title: "Diabetes-Friendly Diet",
      description: "Balanced nutrition plans designed to help manage blood glucose levels effectively.",
      features: [
        "Low glycemic index foods",
        "Portion-controlled meals",
        "Regular eating schedule"
      ],
      imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      linkUrl: "#diabetes-diet"
    },
    {
      title: "Heart-Healthy Diet",
      description: "Nutrition plans focused on improving cardiovascular health and reducing risk factors.",
      features: [
        "Low sodium options",
        "Omega-3 rich foods",
        "Reduced saturated fat"
      ],
      imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      linkUrl: "#heart-diet"
    },
    {
      title: "Kidney-Friendly Diet",
      description: "Specialized nutrition plans to support kidney function and overall renal health.",
      features: [
        "Controlled protein intake",
        "Potassium management",
        "Phosphorus restriction"
      ],
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      linkUrl: "#kidney-diet"
    }
  ];
  
  // Setup mutation for generating diet recommendations
  const dietRecommendation = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return generateDietRecommendations(healthProfile);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      setPersonalizedPlan(data);
      toast({
        title: "Diet Plan Generated",
        description: "Your personalized diet plan has been created successfully!",
      });
      console.log(data);
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message || "Failed to generate diet recommendations. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const handleGenerateDietPlan = () => {
    dietRecommendation.mutate();
  };
  
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-neutral-800">Healthy Diet Recommendations</h1>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            Explore nutrition advice for various health conditions
          </p>
        </div>
        
        {personalizedPlan ? (
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="shadow-lg border-primary border">
              <CardHeader className="bg-primary text-white">
                <CardTitle className="text-xl">Your Personalized Diet Plan</CardTitle>
                <CardDescription className="text-white text-opacity-90">
                  Based on your health profile and risk assessments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-neutral-800">Diet Overview</h3>
                  <p className="text-neutral-600">{personalizedPlan.dietPlan}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-neutral-800">Recommended Foods</h3>
                    <ul className="space-y-2">
                      {personalizedPlan.foodsToEat.map((food: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>{food}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-neutral-800">Foods to Limit</h3>
                    <ul className="space-y-2">
                      {personalizedPlan.foodsToAvoid.map((food: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="h-5 w-5 text-red-500 mr-2 mt-0.5">✕</span>
                          <span>{food}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-neutral-800">Sample Meal Ideas</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2 text-neutral-700">Breakfast</h4>
                      <ul className="space-y-1 text-sm">
                        {personalizedPlan.mealIdeas.breakfast.map((meal: string, index: number) => (
                          <li key={index} className="text-neutral-600">• {meal}</li>
                        ))}
                      </ul>
                      
                      <h4 className="font-medium mb-2 mt-4 text-neutral-700">Lunch</h4>
                      <ul className="space-y-1 text-sm">
                        {personalizedPlan.mealIdeas.lunch.map((meal: string, index: number) => (
                          <li key={index} className="text-neutral-600">• {meal}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-neutral-700">Dinner</h4>
                      <ul className="space-y-1 text-sm">
                        {personalizedPlan.mealIdeas.dinner.map((meal: string, index: number) => (
                          <li key={index} className="text-neutral-600">• {meal}</li>
                        ))}
                      </ul>
                      
                      <h4 className="font-medium mb-2 mt-4 text-neutral-700">Snacks</h4>
                      <ul className="space-y-1 text-sm">
                        {personalizedPlan.mealIdeas.snacks.map((snack: string, index: number) => (
                          <li key={index} className="text-neutral-600">• {snack}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center mt-6">
              <Button 
                onClick={() => setPersonalizedPlan(null)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Go Back to Diet Categories
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dietPlans.map((plan, index) => (
                <DietCard
                  key={index}
                  title={plan.title}
                  description={plan.description}
                  features={plan.features}
                  imageUrl={plan.imageUrl}
                  linkUrl={plan.linkUrl}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-neutral-600 mb-4">
                Browse through our diet recommendations tailored for different health conditions.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
