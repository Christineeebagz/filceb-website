// components/AuthModalContent.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema } from "@/lib/validations";
import { signInWithCredentials, signUp } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useModal } from "@/contexts/ModalContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { aileron } from "@/lib/fonts";

interface AuthModalContentProps {
  type: "SIGN_IN" | "SIGN_UP";
}

type SignInFormData = {
  email: string;
  password: string;
};

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthModalContent({ type }: AuthModalContentProps) {
  const { closeAuthModal, openAuthModal } = useModal();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Determine which schema and default values to use
  const isSignIn = type === "SIGN_IN";
  const schema = isSignIn ? signInSchema : signUpSchema;

  // Create form with appropriate type
  const form = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: isSignIn
      ? { email: "", password: "" }
      : { email: "", password: "", confirmPassword: "" },
  });

  // Handle form submission
  const onSubmit = async (data: SignInFormData | SignUpFormData) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const result = isSignIn
        ? await signInWithCredentials(data as SignInFormData)
        : await signUp(data as SignUpFormData);

      if (result.success) {
        toast.success(
          isSignIn
            ? "You have successfully signed in"
            : "You have successfully signed up"
        );
        closeAuthModal();
        // Optional: Refresh the page or update UI state
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } else {
        setSubmitError(result.error || "An error occurred");
        toast.error(result.error || "An error occurred");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setSubmitError(error.message || "An unexpected error occurred");
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Switch between sign-in and sign-up
  const switchMode = () => {
    const newType = isSignIn ? "SIGN_UP" : "SIGN_IN";
    openAuthModal(newType);

    // Reset with the correct shape based on the new mode
    if (isSignIn) {
      // Switching to Sign Up
      form.reset({ email: "", password: "", confirmPassword: "" });
    } else {
      // Switching to Sign In
      form.reset({ email: "", password: "" });
    }
  };

  return (
    <div className="space-y-5">
      {/* Header with Logo and Branding */}
      <div className="text-center space-y-2">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <Image
              src="/logos/filceblogo.svg"
              alt="Filceb Logo"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Filceb Business Club - Aileron Black, All Caps */}
        <h2
          className={`${aileron.className} font-black text-xl text-white uppercase tracking-wide`}
        >
          Filceb Business Club
        </h2>

        {/* Cebu, Philippines - Times New Roman */}
        <p
          className="text-white/80 text-sm"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Cebu, Philippines
        </p>

        {/* Dynamic Title based on mode */}
        <h3 className="text-xl font-bold text-white pt-2">
          {isSignIn ? "Welcome Back" : "Create an Account"}
        </h3>
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="py-2 px-3 text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded-lg">
          {submitError}
        </div>
      )}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-xs font-medium">
                  E-mail
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter E-mail"
                    className={cn(
                      "bg-white/5 border-white/10 text-white text-sm",
                      "placeholder:text-white/40 placeholder:text-sm",
                      "focus:border-[#F8EF30]/50 focus:ring-[#F8EF30]/20",
                      "transition-colors h-9"
                    )}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-xs font-medium">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    className={cn(
                      "bg-white/5 border-white/10 text-white text-sm",
                      "placeholder:text-white/40 placeholder:text-sm",
                      "focus:border-[#F8EF30]/50 focus:ring-[#F8EF30]/20",
                      "transition-colors h-9"
                    )}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Confirm Password Field (Sign Up Only) */}
          {!isSignIn && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90 text-xs font-medium">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Retype Password"
                      className={cn(
                        "bg-white/5 border-white/10 text-white text-sm",
                        "placeholder:text-white/40 placeholder:text-sm",
                        "focus:border-[#F8EF30]/50 focus:ring-[#F8EF30]/20",
                        "transition-colors h-9"
                      )}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full mt-4",
              "bg-gradient-to-r from-[#F8EF30] to-[#F8EF30]/90",
              "text-[#1E1E1E] font-semibold text-sm",
              "hover:from-[#F8EF30]/90 hover:to-[#F8EF30]/80",
              "active:scale-[0.98] transition-all duration-200",
              "shadow-lg shadow-[#F8EF30]/10",
              "h-9"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Processing...
              </>
            ) : isSignIn ? (
              "Log-in"
            ) : (
              "Sign-Up"
            )}
          </Button>
        </form>
      </Form>

      {/* Switch Mode */}
      <div className="pt-2">
        <p className="text-center text-white/70 text-xs">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={switchMode}
            className="font-semibold text-[#F8EF30] hover:text-[#F8EF30]/80 hover:underline transition-colors"
            disabled={isLoading}
          >
            {isSignIn ? "Sign-up" : "Log-in"}
          </button>
        </p>
      </div>
    </div>
  );
}
