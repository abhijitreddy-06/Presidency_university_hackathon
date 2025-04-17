import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "@/lib/openai";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type MessageType = {
  role: "user" | "assistant";
  content: string;
};

interface HealthAssistantChatbotProps {
  className?: string;
}

export function HealthAssistantChatbot({ className }: HealthAssistantChatbotProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: "assistant",
      content: "Hello! I'm your HealthPredict AI assistant. How can I help you with your health questions today?",
    },
  ]);
  // No longer need user since auth is removed
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Create a mutation for sending chat messages
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      // Anonymous guest user
      const userProfile = {
        username: "Guest",
        email: "guest@example.com"
      };
      
      return await sendChatMessage(message, messages, userProfile);
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "" || sendMessageMutation.isPending) return;

    // Add user message to chat
    const userMessage = { role: "user" as const, content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    
    // Send message to AI
    sendMessageMutation.mutate(inputMessage);
    
    // Clear input
    setInputMessage("");
  };

  return (
    <Card className={cn("flex flex-col h-[500px] max-w-xl mx-auto border-primary/10 shadow-md", className)}>
      <CardHeader className="pb-3 border-b bg-primary/5">
        <CardTitle className="flex items-center text-primary">
          <div className="mr-3 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          HealthPredict AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pb-0 pt-4 px-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 bg-primary/10 border border-primary/20">
                  <AvatarFallback className="text-primary">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 max-w-[80%] shadow-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted rounded-tl-none border border-primary/10"
                )}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 bg-primary/20 border border-primary/30">
                  <AvatarFallback>
                    <User className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {sendMessageMutation.isPending && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 bg-primary/10 border border-primary/20">
                <AvatarFallback className="text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 border border-primary/10">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2 w-full relative">
          <Input
            placeholder="Type your health question..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 pr-12 border-primary/20 focus-visible:ring-primary/30 rounded-full pl-4"
            disabled={sendMessageMutation.isPending}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1 rounded-full h-8 w-8 bg-primary"
            disabled={sendMessageMutation.isPending || !inputMessage.trim()}
          >
            {sendMessageMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}