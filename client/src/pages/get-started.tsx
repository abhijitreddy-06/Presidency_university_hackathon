import { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation, Redirect } from "wouter";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Form schema for user registration
const signupSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

// Form schema for user login
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  rememberMe: z.boolean().optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

export default function GetStarted() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const { user, isLoading } = useAuth();

  // Create signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  // Create login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Setup mutation for signup form submission
  const signup = useMutation({
    mutationFn: async (data: Omit<SignupFormValues, "terms">) => {
      const response = await apiRequest("POST", "/api/users", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account");
      }
      return response.json();
    },
    onSuccess: async (data) => {
      setFormError(null);
      toast({
        title: "Account created successfully!",
        description: `Welcome ${data.username}! Logging you in...`,
      });
      
      // Store password before resetting form
      const password = signupForm.getValues().password;
      signupForm.reset();
      
      // Now automatically log the user in after signup
      try {
        console.log("Attempting auto-login after registration", { email: data.email });
        
        // Make a direct call to the login endpoint with proper email and password
        const loginResponse = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: password
          }),
          credentials: "include"
        });
        
        if (loginResponse.ok) {
          const userData = await loginResponse.json();
          queryClient.setQueryData(["/api/user"], userData);
          
          // Set redirect state to trigger redirection
          console.log("Logged in successfully after account creation, redirecting...");
          toast({
            title: "Login successful!",
            description: "Redirecting to your dashboard...",
          });
          setTimeout(() => {
            setShouldRedirect(true);
          }, 1500);
        } else {
          // If auto-login fails, still show success but instruct to log in manually
          console.error("Auto-login failed:", await loginResponse.text());
          toast({
            title: "Account created!",
            description: "Please log in with your new credentials.",
          });
          setIsSignUp(false);
        }
      } catch (error) {
        console.error("Auto-login failed:", error);
        toast({
          title: "Account created!",
          description: "Please log in with your new credentials.",
        });
      }
    },
    onError: (error: Error) => {
      setFormError(error.message);
      toast({
        title: "Error creating account",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Setup mutation for login form submission
  const login = useMutation({
    mutationFn: async (data: Omit<LoginFormValues, "rememberMe">) => {
      const response = await apiRequest("POST", "/api/login", data);
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setFormError(null);
      toast({
        title: "Login successful!",
        description: `Welcome back, ${data.username}!`,
      });
      loginForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      
      // Set redirect state to true to trigger redirection
      setTimeout(() => {
        setShouldRedirect(true);
      }, 1500);
    },
    onError: (error) => {
      setFormError(error.message);
      toast({
        title: "Login failed",
        description: error.message || "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
    },
  });

  // Handle signup form submission
  function onSignupSubmit(data: SignupFormValues) {
    setFormError(null);
    const { terms, ...userData } = data;
    signup.mutate(userData);
  }

  // Handle login form submission
  function onLoginSubmit(data: LoginFormValues) {
    setFormError(null);
    const { rememberMe, ...loginData } = data;
    login.mutate(loginData);
  }

  // Toggle between signup and login forms
  const toggleForm = () => {
    setFormError(null);
    setIsSignUp(!isSignUp);
    signupForm.reset();
    loginForm.reset();
  };

  // If already logged in or should redirect after login/signup, redirect to the home page
  if (user || shouldRedirect) {
    console.log("User already logged in or completed login, redirecting to home page...");
    return <Redirect to="/" />;
  }
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary to-[#008080]">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-[#008080]">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center text-white">
          <h1 className="text-3xl font-bold mb-6">
            {isSignUp ? "Ready to Take Control of Your Health?" : "Welcome Back!"}
          </h1>
          <p className="text-lg mb-8">
            {isSignUp
              ? "Create your free account and get personalized health insights, recommendations, and tracking tools."
              : "Sign in to access your personalized health dashboard and recommendations."}
          </p>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            {formError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            
            {isSignUp ? (
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700">Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" type="email" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700">Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Create a password" type="password" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-neutral-700">
                            I agree to the{" "}
                            <a href="#" className="text-primary hover:underline">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-primary hover:underline">
                              Privacy Policy
                            </a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-[#008080] hover:opacity-90"
                    disabled={signup.isPending}
                  >
                    {signup.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Free Account"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" type="email" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700">Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your password" type="password" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-neutral-700 cursor-pointer">
                          Remember me
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-[#008080] hover:opacity-90"
                    disabled={login.isPending}
                  >
                    {login.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>

          <p className="text-white text-opacity-80">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <Button
              variant="link"
              className="text-white underline p-0"
              onClick={toggleForm}
            >
              {isSignUp ? "Sign in" : "Create account"}
            </Button>
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-16 bg-white bg-opacity-10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Why Join HealthPredict?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Risk Assessment</h3>
              <p className="text-white text-opacity-80">
                Get accurate health predictions based on your unique profile and medical history.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customized Health Plans</h3>
              <p className="text-white text-opacity-80">
                Receive tailored diet and exercise recommendations based on your health assessment.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-white text-opacity-80">
                Monitor your health improvements over time with easy-to-understand visualizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}