import { HealthAssistantChatbot } from "@/components/health-assistant-chatbot";
import { Bot } from "lucide-react";

export default function Assistant() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Your AI Health Assistant
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Get personalized health guidance, diet recommendations, and exercise advice from our 
              advanced AI assistant. Ask anything about health conditions and receive evidence-based answers.
            </p>
          </div>
          
          <div className="mb-12 bg-gradient-to-r from-primary/5 to-transparent p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-primary">
              <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Popular Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-primary/10 card-hover">
                <p className="font-medium text-lg mb-3 text-primary">About Health Conditions</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    What are early signs of diabetes?
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    How can I lower my heart disease risk?
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    What lifestyle changes help with kidney health?
                  </li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-primary/10 card-hover">
                <p className="font-medium text-lg mb-3 text-primary">Diet Recommendations</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    What foods should I eat for better heart health?
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    Can you suggest a meal plan for diabetes management?
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    What are anti-inflammatory foods I should include?
                  </li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-primary/10 card-hover">
                <p className="font-medium text-lg mb-3 text-primary">Exercise Advice</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    What exercises are safe for high blood pressure?
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    How much exercise do I need weekly for heart health?
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    Can you suggest low-impact exercises for beginners?
                  </li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-primary/10 card-hover">
                <p className="font-medium text-lg mb-3 text-primary">General Health</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    How can I improve my sleep quality?
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    What are effective stress management techniques?
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    What health screenings are recommended for my age?
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-md border border-primary/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center text-primary">
                <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Chat With AI Assistant
              </h2>
              <div className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                Powered by GPT-4o
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-6 p-3 border border-amber-200 bg-amber-50 rounded-lg inline-flex items-start w-full">
              <svg className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>
                <strong>Medical Disclaimer:</strong> This AI assistant provides general health information and is not a substitute for 
                professional medical advice. Always consult with healthcare professionals for personalized guidance.
              </span>
            </p>
            
            <HealthAssistantChatbot className="shadow-none border-none" />
          </div>
        </div>
      </div>
    </div>
  );
}