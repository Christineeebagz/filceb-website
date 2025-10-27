// components/status/register/page.tsx
"use client";
import AuthForm from "@/components/AuthForm";
import { registerSchema } from "@/lib/validations";
import { register } from "@/lib/actions/auth";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();

  const handleRegister = async (
    data: any
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log("Register page - data received:", data);
      const result = await register(data);

      if (result.success) {
        toast.success("Registration completed successfully!");

        // Force a complete page reload to get fresh session data
        // This is the most reliable way to refresh the session
        setTimeout(() => {
          window.location.href = "/"; // Use href instead of reload for cleaner navigation
        }, 1000);

        return { success: true };
      } else {
        toast.error(result.error || "Registration failed");
        return { success: false, error: result.error };
      }
    } catch (error: any) {
      console.error("Registration error in page:", error);
      toast.error(error.message || "An unexpected error occurred");
      return { success: false, error: error.message };
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Complete Your Registration</h2>
      <AuthForm
        type="REGISTER"
        schema={registerSchema}
        defaultValues={{
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          barangayAddress: "",
          province: "",
          city: "",
          businessName: "",
          businesstype: "",
          idUpload: "",
          businessDocuments: "",
        }}
        onSubmit={handleRegister}
      />
    </div>
  );
};

export default Register;
