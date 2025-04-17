import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

interface DietCardProps {
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  linkUrl: string;
}

export default function DietCard({ 
  title, 
  description, 
  features, 
  imageUrl, 
  linkUrl 
}: DietCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Sample complete diet plan data
  const completePlan = {
    overview: `This ${title.toLowerCase()} is designed to help manage your health condition through proper nutrition. By following these dietary guidelines, you can improve your overall health outcomes and reduce your risk of complications.`,
    recommendedFoods: [
      "Whole grains (brown rice, quinoa, oats)",
      "Lean proteins (chicken, fish, tofu)",
      "Healthy fats (olive oil, avocados, nuts)",
      "Colorful vegetables (leafy greens, bell peppers, carrots)",
      "Low-glycemic fruits (berries, apples, citrus)"
    ],
    foodsToAvoid: [
      "Processed foods with added sugars",
      "High-sodium processed foods",
      "Trans fats and fried foods",
      "Excessive red meat consumption",
      "Alcohol and sugary beverages"
    ],
    mealPlan: {
      breakfast: [
        "Steel-cut oats with berries and nuts",
        "Greek yogurt with fresh fruit and a sprinkle of flaxseeds",
        "Whole grain toast with avocado and a poached egg"
      ],
      lunch: [
        "Quinoa bowl with roasted vegetables and chickpeas",
        "Mediterranean salad with olive oil dressing",
        "Lentil soup with a side of mixed greens"
      ],
      dinner: [
        "Baked salmon with steamed vegetables and brown rice",
        "Stir-fried tofu with vegetables and a small portion of whole grain noodles",
        "Roasted chicken with sweet potatoes and broccoli"
      ],
      snacks: [
        "Apple slices with almond butter",
        "Handful of mixed nuts and seeds",
        "Carrot sticks with hummus"
      ]
    }
  };
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full object-cover" 
            width="500" 
            height="300" 
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">{title}</h3>
          <p className="text-neutral-600 mb-4">{description}</p>
          <ul className="space-y-2 text-sm text-neutral-600 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <Button 
            variant="link" 
            className="p-0 text-primary font-medium hover:underline"
            onClick={() => setDialogOpen(true)}
          >
            View Complete Plan →
          </Button>
        </div>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">{title}</DialogTitle>
            <DialogDescription>
              A comprehensive nutrition plan for better health management
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Plan Overview</h3>
              <p className="text-neutral-600">{completePlan.overview}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Recommended Foods</h3>
                <ul className="space-y-2">
                  {completePlan.recommendedFoods.map((food, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Foods to Limit</h3>
                <ul className="space-y-2">
                  {completePlan.foodsToAvoid.map((food, index) => (
                    <li key={index} className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Sample Meal Ideas</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Breakfast</h4>
                  <ul className="space-y-1 text-sm">
                    {completePlan.mealPlan.breakfast.map((meal, index) => (
                      <li key={index} className="text-neutral-600">• {meal}</li>
                    ))}
                  </ul>
                  
                  <h4 className="font-medium mb-2 mt-4">Lunch</h4>
                  <ul className="space-y-1 text-sm">
                    {completePlan.mealPlan.lunch.map((meal, index) => (
                      <li key={index} className="text-neutral-600">• {meal}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Dinner</h4>
                  <ul className="space-y-1 text-sm">
                    {completePlan.mealPlan.dinner.map((meal, index) => (
                      <li key={index} className="text-neutral-600">• {meal}</li>
                    ))}
                  </ul>
                  
                  <h4 className="font-medium mb-2 mt-4">Snacks</h4>
                  <ul className="space-y-1 text-sm">
                    {completePlan.mealPlan.snacks.map((snack, index) => (
                      <li key={index} className="text-neutral-600">• {snack}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <DialogClose asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Close
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
