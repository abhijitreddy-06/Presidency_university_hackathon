import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateExercisePlan } from "@/lib/openai";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ExerciseCard from "@/components/exercise-card";
import { Loader2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLocation } from "wouter";

export default function Exercise() {
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
          exerciseRecommendation.mutate();
        }
      }
    } catch (error) {
      console.error("Failed to parse stored health profile:", error);
    }
  }, [location]);
  
  // Exercise plans (would normally be generated from OpenAI)
  const exercisePlans = [
    {
      title: "Daily Walking",
      level: "Beginner" as const,
      description: "A gentle, progressive walking program ideal for those new to exercise or managing multiple health conditions.",
      details: [
        "15-30 minutes daily",
        "Gradually increasing intensity",
        "Heart rate monitoring"
      ],
      imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      linkUrl: "#walking-plan"
    },
    {
      title: "Strength Training",
      level: "Intermediate" as const,
      description: "Build muscle mass and improve insulin sensitivity with this targeted resistance training program.",
      details: [
        "30-45 minutes, 3x weekly",
        "Focus on major muscle groups",
        "Progressive resistance"
      ],
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      linkUrl: "#strength-plan"
    },
    {
      title: "Cardio Mix",
      level: "Advanced" as const,
      description: "Comprehensive cardiovascular exercise program for improving heart health and endurance.",
      details: [
        "45-60 minutes, 4x weekly",
        "Interval training",
        "Multiple activity rotation"
      ],
      imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      linkUrl: "#cardio-plan"
    }
  ];
  
  // Setup mutation for generating exercise recommendations
  const exerciseRecommendation = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return generateExercisePlan(healthProfile);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      setPersonalizedPlan(data);
      toast({
        title: "Exercise Plan Generated",
        description: "Your personalized exercise plan has been created successfully!",
      });
      console.log(data);
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message || "Failed to generate exercise plan. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const handleGenerateExercisePlan = () => {
    exerciseRecommendation.mutate();
  };
  
  // Helper function to get the background color based on intensity
  const getIntensityColor = (intensity: string) => {
    const lowerIntensity = intensity.toLowerCase();
    if (lowerIntensity.includes('low')) return 'bg-green-100 text-green-800';
    if (lowerIntensity.includes('moderate')) return 'bg-yellow-100 text-yellow-800';
    if (lowerIntensity.includes('high')) return 'bg-red-100 text-red-800';
    return 'bg-blue-100 text-blue-800';
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-neutral-800">Exercise Recommendations</h1>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            Physical activity options for different health conditions and fitness levels
          </p>
        </div>
        
        {personalizedPlan ? (
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="shadow-lg border-primary border">
              <CardHeader className="bg-primary text-white">
                <CardTitle className="text-xl">{personalizedPlan.planType}</CardTitle>
                <CardDescription className="text-white text-opacity-90">
                  Based on your health profile and risk assessments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-neutral-800">Plan Overview</h3>
                  <p className="text-neutral-600">{personalizedPlan.planDescription}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-neutral-800">Weekly Schedule</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Day</TableHead>
                          <TableHead>Activities</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {personalizedPlan.weeklySchedule.map((day: any, dayIndex: number) => (
                          <TableRow key={dayIndex}>
                            <TableCell className="font-medium">{day.day}</TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                {day.activities.map((activity: any, activityIndex: number) => (
                                  <div key={activityIndex} className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                                    <span className="font-medium">{activity.name}</span>
                                    <div className="flex flex-wrap gap-2">
                                      <span className="text-xs rounded-full bg-neutral-100 px-2 py-1">
                                        {activity.duration}
                                      </span>
                                      <span className={`text-xs rounded-full px-2 py-1 ${getIntensityColor(activity.intensity)}`}>
                                        {activity.intensity}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-md font-medium mb-2 text-neutral-800">Important Health Precautions</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 list-disc list-inside">
                        {personalizedPlan.precautions.map((precaution: string, index: number) => (
                          <li key={index}>{precaution}</li>
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
                Go Back to Exercise Categories
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exercisePlans.map((plan, index) => (
                <ExerciseCard
                  key={index}
                  title={plan.title}
                  level={plan.level}
                  description={plan.description}
                  details={plan.details}
                  imageUrl={plan.imageUrl}
                  linkUrl={plan.linkUrl}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-neutral-600 mb-4">
                Explore exercise options suitable for different fitness levels and health conditions.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
