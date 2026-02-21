// components/status/unsubmitted/page.tsx
"use client";

import AuthForm from "@/components/AuthForm";
import { registerSchema } from "@/lib/validations";
import { register } from "@/lib/actions/auth";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatusMessage } from "../StatusMessage";

const UnsubmittedStatus = () => {
  const router = useRouter();

  const handleRegister = async (
    data: any
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log("Unsubmitted status - data received:", data);
      const result = await register(data);

      if (result.success) {
        toast.success("Registration completed successfully!");

        // Force a complete page reload to get fresh session data
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);

        return { success: true };
      } else {
        toast.error(result.error || "Registration failed");
        return { success: false, error: result.error };
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "An unexpected error occurred");
      return { success: false, error: error.message };
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto ">
        {/* Status Message */}
        <StatusMessage
          title="Welcome to the FilCeb Community!"
          status="Unsubmitted"
          statusColor="#8C52FF" // Purple for unsubmitted
          comment="Thank you for signing up!"
          instruction="To activate your account and get full access to our network, please finish setting up your profile by completing the application form below."
          closing="We're excited to welcome you officially into our community."
          showContact={true}
        />

        {/* Registration Form */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="backdrop-blur-sm rounded-2xl p-8 mb-24 border border-gray-200">
            <h2 className="text-2xl font-bold text-[#1E1E1E] mb-6 text-center">
              Complete Your Application
            </h2>
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
        </div>
      </div>
    </div>
  );
};

export default UnsubmittedStatus;
