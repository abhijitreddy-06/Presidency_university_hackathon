import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import Home from "@/pages/home";
import PredictionHub from "@/pages/prediction-hub";
import Diabetes from "@/pages/diabetes";
import HeartDisease from "@/pages/heart-disease";
import KidneyDisease from "@/pages/kidney-disease";
import LiverDisease from "@/pages/liver-disease";
import Diet from "@/pages/diet";
import Exercise from "@/pages/exercise";
import Resources from "@/pages/resources";
import Assistant from "@/pages/assistant";
import { FloatingChatButton } from "@/components/floating-chat-button";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/prediction-hub" component={PredictionHub} />
      <Route path="/diabetes" component={Diabetes} />
      <Route path="/heart-disease" component={HeartDisease} />
      <Route path="/kidney-disease" component={KidneyDisease} />
      <Route path="/liver-disease" component={LiverDisease} />
      <Route path="/diet" component={Diet} />
      <Route path="/exercise" component={Exercise} />
      <Route path="/resources" component={Resources} />
      <Route path="/assistant" component={Assistant} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        <FloatingChatButton />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
