import { apiRequest } from "./queryClient";

// Send message to AI assistant and get a response
export async function sendChatMessage(
  message: string,
  chatHistory: { role: "user" | "assistant"; content: string }[],
  userProfile?: any
): Promise<{ reply: string }> {
  try {
    const response = await apiRequest("POST", "/api/openai/chat", {
      message,
      chatHistory,
      userProfile
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to send chat message:", error);
    throw new Error("Failed to send message. Please try again later.");
  }
}

// Generate diet recommendations based on health profile
export async function generateDietRecommendations(
  healthProfile: {
    diabetesRisk?: number;
    heartDiseaseRisk?: number;
    kidneyDiseaseRisk?: number;
    liverDiseaseRisk?: number;
    age: number;
    gender: string;
  }
): Promise<{
  dietPlan: string;
  foodsToEat: string[];
  foodsToAvoid: string[];
  mealIdeas: { breakfast: string[]; lunch: string[]; dinner: string[]; snacks: string[] };
}> {
  try {
    const response = await apiRequest("POST", "/api/openai/diet-recommendations", healthProfile);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to generate diet recommendations:", error);
    throw new Error("Failed to generate diet recommendations. Please try again later.");
  }
}

// Generate exercise recommendations based on health profile
export async function generateExercisePlan(
  healthProfile: {
    diabetesRisk?: number;
    heartDiseaseRisk?: number;
    kidneyDiseaseRisk?: number;
    liverDiseaseRisk?: number;
    age: number;
    gender: string;
  }
): Promise<{
  planType: string;
  planDescription: string;
  weeklySchedule: { day: string; activities: { name: string; duration: string; intensity: string }[] }[];
  precautions: string[];
}> {
  try {
    const response = await apiRequest("POST", "/api/openai/exercise-plan", healthProfile);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to generate exercise plan:", error);
    throw new Error("Failed to generate exercise plan. Please try again later.");
  }
}

// Generate educational content about a disease
export async function generateEducationalContent(
  disease: "diabetes" | "heart-disease" | "kidney-disease" | "liver-disease"
): Promise<{
  overview: string;
  symptoms: string[];
  riskFactors: string[];
  preventionTips: string[];
  managementStrategies: string[];
}> {
  try {
    const response = await apiRequest("POST", "/api/openai/educational-content", { disease });
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to generate educational content:", error);
    throw new Error("Failed to generate educational content. Please try again later.");
  }
}
