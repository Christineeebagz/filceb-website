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

interface AuthModalContentProps {
  type: "SIGN_IN" | "SIGN_UP";
}

export default function AuthModalContent({ type }: AuthModalContentProps) {
  const { closeAuthModal, openAuthModal } = useModal();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Determine which schema and default values to use
  const isSignIn = type === "SIGN_IN";
  const schema = isSignIn ? signInSchema : signUpSchema;
  const defaultValues = isSignIn
    ? { email: "", password: "" }
    : { email: "", password: "", confirmPassword: "" };

  // Initialize form
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const result = isSignIn
        ? await signInWithCredentials(data)
        : await signUp(data);

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
    form.reset(isSignIn ? defaultValues : { email: "", password: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#F8EF30]/20 to-transparent mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F8EF30] to-[#F8EF30]/70" />
        </div>

        <h2 className="text-2xl font-bold text-white">
          {isSignIn ? "Welcome Back" : "Join FilCeb"}
        </h2>
        <p className="text-white/70 text-sm">
          {isSignIn
            ? "Sign in to continue your business journey"
            : "Create your account to join our community"}
        </p>
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded-lg">
          {submitError}
        </div>
      )}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-sm font-medium">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className={cn(
                      "bg-white/5 border-white/10 text-white",
                      "placeholder:text-white/40",
                      "focus:border-[#F8EF30]/50 focus:ring-[#F8EF30]/20",
                      "transition-colors"
                    )}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-sm font-medium">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className={cn(
                      "bg-white/5 border-white/10 text-white",
                      "placeholder:text-white/40",
                      "focus:border-[#F8EF30]/50 focus:ring-[#F8EF30]/20",
                      "transition-colors"
                    )}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
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
                  <FormLabel className="text-white/90 text-sm font-medium">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className={cn(
                        "bg-white/5 border-white/10 text-white",
                        "placeholder:text-white/40",
                        "focus:border-[#F8EF30]/50 focus:ring-[#F8EF30]/20",
                        "transition-colors"
                      )}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          )}

          {/* Forgot Password Link (Sign In Only) */}
          {isSignIn && (
            <div className="text-right pt-1">
              <button
                type="button"
                className="text-sm text-[#F8EF30] hover:text-[#F8EF30]/80 hover:underline transition-colors"
                disabled={isLoading}
                onClick={() => {
                  closeAuthModal();
                  // TODO: Implement forgot password flow
                  // router.push('/forgot-password');
                }}
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full mt-6",
              "bg-gradient-to-r from-[#F8EF30] to-[#F8EF30]/90",
              "text-[#1E1E1E] font-semibold",
              "hover:from-[#F8EF30]/90 hover:to-[#F8EF30]/80",
              "active:scale-[0.98] transition-all duration-200",
              "shadow-lg shadow-[#F8EF30]/10"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : isSignIn ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>

      {/* Switch Mode */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-center text-white/70 text-sm">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={switchMode}
            className="font-semibold text-[#F8EF30] hover:text-[#F8EF30]/80 hover:underline transition-colors"
            disabled={isLoading}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>

      {/* Terms (Sign Up Only) */}
      {!isSignIn && (
        <p className="text-xs text-white/50 text-center px-4">
          By creating an account, you agree to our{" "}
          <button
            type="button"
            className="text-[#F8EF30]/70 hover:text-[#F8EF30] hover:underline"
            onClick={() => {
              closeAuthModal();
              // router.push('/terms');
            }}
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="text-[#F8EF30]/70 hover:text-[#F8EF30] hover:underline"
            onClick={() => {
              closeAuthModal();
              // router.push('/privacy');
            }}
          >
            Privacy Policy
          </button>
        </p>
      )}
    </div>
  );
}
