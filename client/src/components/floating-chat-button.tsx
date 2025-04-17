import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { HealthAssistantChatbot } from "@/components/health-assistant-chatbot";
import { Bot, X } from "lucide-react";

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 shadow-xl h-14 w-14 rounded-full p-0 bg-primary hover:bg-primary/90 transition-all animate-pulse-slow group"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-10 right-0 bg-white rounded-md px-3 py-1 shadow-md text-sm font-medium text-primary hidden group-hover:block transition-opacity pointer-events-none">
            Ask AI Assistant
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[80vh] p-0">
        <div className="flex items-center justify-between px-4 pt-5 pb-0">
          <DialogHeader>
            <DialogTitle className="flex items-center text-primary">
              <Bot className="mr-2 h-5 w-5" />
              HealthPredict AI Assistant
            </DialogTitle>
            <DialogDescription className="sr-only">
              Chat with our AI-powered health assistant
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="px-4 pb-5 pt-2">
          <HealthAssistantChatbot className="h-[60vh] border-0 shadow-none" />
        </div>
      </DialogContent>
    </Dialog>
  );
}