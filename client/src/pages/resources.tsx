import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateEducationalContent } from "@/lib/openai";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ResourceCard from "@/components/resource-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, AlertCircle } from "lucide-react";

type EducationalContent = {
  overview: string;
  symptoms: string[];
  riskFactors: string[];
  preventionTips: string[];
  managementStrategies: string[];
};

export default function Resources() {
  const [selectedDisease, setSelectedDisease] = useState<"diabetes" | "heart-disease" | "kidney-disease" | "liver-disease">("diabetes");
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<EducationalContent | null>(null);
  const { toast } = useToast();

  // Articles data
  const articles = [
    {
      type: "article" as const,
      category: "diabetes" as const,
      title: "Understanding Diabetes",
      description: "Comprehensive guide to diabetes types, risk factors, prevention, and management.",
      linkUrl: "#diabetes-guide",
    },
    {
      type: "article" as const,
      category: "heart" as const,
      title: "Heart Health Essentials",
      description: "Key information about cardiovascular health, risk factors, and preventive measures.",
      linkUrl: "#heart-health",
    },
    {
      type: "article" as const,
      category: "kidney" as const,
      title: "Kidney Health Guide",
      description: "Essential information about kidney function, disease prevention, and management strategies.",
      linkUrl: "#kidney-guide",
    },
    {
      type: "article" as const,
      category: "liver" as const,
      title: "Liver Health 101",
      description: "Overview of liver function, common liver conditions, and protective measures.",
      linkUrl: "#liver-guide",
    },
  ];

  // Video resources data
  const videos = [
    {
      type: "video" as const,
      category: "diabetes" as const,
      title: "Understanding Your Diabetes Risk Factors",
      author: "Dr. Sarah Johnson",
      duration: "15:24",
      linkUrl: "#diabetes-video",
    },
    {
      type: "video" as const,
      category: "heart" as const,
      title: "Heart Health: Prevention Strategies",
      author: "Dr. Michael Chen",
      duration: "18:37",
      linkUrl: "#heart-video",
    },
    {
      type: "video" as const,
      category: "kidney" as const,
      title: "Managing Kidney Health: Expert Advice",
      author: "Dr. Emily Rodriguez",
      duration: "12:15",
      linkUrl: "#kidney-video",
    },
    {
      type: "video" as const,
      category: "liver" as const,
      title: "Nutrition for Chronic Disease Prevention",
      author: "Lisa Martinez, RD",
      duration: "22:15",
      linkUrl: "#liver-video",
    },
  ];

  // Setup mutation for generating educational content
  const educationalContent = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return generateEducationalContent(selectedDisease);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      setContent(data);
      toast({
        title: "Content Generated",
        description: `Educational content about ${selectedDisease.replace("-", " ")} has been created successfully!`,
      });
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message || "Failed to generate educational content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerateContent = () => {
    educationalContent.mutate();
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-neutral-800">Educational Resources</h1>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            Learn more about managing your health and preventing chronic diseases
          </p>
        </div>

        <Tabs defaultValue="articles" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((article, index) => (
                <ResourceCard
                  key={index}
                  type={article.type}
                  title={article.title}
                  category={article.category}
                  description={article.description}
                  linkUrl={article.linkUrl}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <ResourceCard
                  key={index}
                  type={video.type}
                  title={video.title}
                  category={video.category}
                  author={video.author}
                  duration={video.duration}
                  linkUrl={video.linkUrl}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Get Personalized Educational Content</h2>
          <p className="text-neutral-600 mb-6">
            Select a health condition below to receive detailed information about risk factors, symptoms, prevention strategies, and management techniques.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Button
              variant={selectedDisease === "diabetes" ? "default" : "outline"} 
              className={selectedDisease === "diabetes" ? "bg-primary" : "border-primary text-primary"}
              onClick={() => setSelectedDisease("diabetes")}
            >
              Diabetes
            </Button>
            <Button
              variant={selectedDisease === "heart-disease" ? "default" : "outline"} 
              className={selectedDisease === "heart-disease" ? "bg-primary" : "border-primary text-primary"}
              onClick={() => setSelectedDisease("heart-disease")}
            >
              Heart Disease
            </Button>
            <Button
              variant={selectedDisease === "kidney-disease" ? "default" : "outline"} 
              className={selectedDisease === "kidney-disease" ? "bg-primary" : "border-primary text-primary"}
              onClick={() => setSelectedDisease("kidney-disease")}
            >
              Kidney Disease
            </Button>
            <Button
              variant={selectedDisease === "liver-disease" ? "default" : "outline"} 
              className={selectedDisease === "liver-disease" ? "bg-primary" : "border-primary text-primary"}
              onClick={() => setSelectedDisease("liver-disease")}
            >
              Liver Disease
            </Button>
          </div>
          
          <Button
            onClick={handleGenerateContent}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-[#008080] hover:opacity-90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Educational Content...
              </>
            ) : (
              `Get Detailed Information About ${selectedDisease.replace("-", " ")}`
            )}
          </Button>
          
          {content && (
            <div className="mt-8 border rounded-lg overflow-hidden">
              <Card>
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-primary text-xl">
                    {selectedDisease.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Overview</h3>
                    <p className="text-neutral-700 leading-relaxed">{content.overview}</p>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="symptoms">
                      <AccordionTrigger className="text-lg font-medium">Symptoms</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          {content.symptoms.map((symptom, index) => (
                            <li key={index} className="text-neutral-700">{symptom}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="riskFactors">
                      <AccordionTrigger className="text-lg font-medium">Risk Factors</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          {content.riskFactors.map((factor, index) => (
                            <li key={index} className="text-neutral-700">{factor}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="prevention">
                      <AccordionTrigger className="text-lg font-medium">Prevention Tips</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          {content.preventionTips.map((tip, index) => (
                            <li key={index} className="text-neutral-700">{tip}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="management">
                      <AccordionTrigger className="text-lg font-medium">Management Strategies</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          {content.managementStrategies.map((strategy, index) => (
                            <li key={index} className="text-neutral-700">{strategy}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Need More Information?</h2>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Our health experts are available to answer your questions and provide personalized guidance
            based on your specific health concerns.
          </p>
          <Button className="bg-gradient-to-r from-primary to-[#008080] hover:opacity-90">
            Contact Our Health Experts
          </Button>
        </div>
      </div>
    </section>
  );
}
