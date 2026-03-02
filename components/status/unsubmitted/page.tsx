// components/status/unsubmitted/page.tsx
"use client";

import AuthForm from "@/components/AuthForm";
import { registerSchema } from "@/lib/validations";
import { register } from "@/lib/actions/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatusMessage } from "../StatusMessage";
import { UnsubmittedConfirmationModal } from "../UnsubmittedConfirmationModal";

const UnsubmittedStatus = () => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This function will be called by AuthForm when user submits
  const handleFormSubmit = async (data: any) => {
    // Instead of submitting directly, store data and show confirmation
    setPendingData(data);
    setShowConfirmation(true);
    return { success: true }; // Return success to prevent form from submitting
  };

  // This function handles the actual submission after confirmation
  const handleConfirmSubmit = async () => {
    if (!pendingData) return;

    setIsSubmitting(true);
    try {
      console.log("Submitting registration data:", pendingData);
      const result = await register(pendingData);

      if (result.success) {
        toast.success("Registration completed successfully!");
        setShowConfirmation(false);

        // Force a complete page reload to get fresh session data
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error(result.error || "Registration failed");
        setShowConfirmation(false);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "An unexpected error occurred");
      setShowConfirmation(false);
    } finally {
      setIsSubmitting(false);
      setPendingData(null);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmation(false);
    // Optionally clear pending data if user cancels
    // setPendingData(null);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Status Message */}
        <StatusMessage
          title="Welcome to the FilCeb Community!"
          status="Unsubmitted"
          statusColor="#8C52FF"
          comment="Thank you for signing up!"
          instruction="To activate your account and get full access to our network, please finish setting up your profile by completing the application form below."
          closing="We're excited to welcome you officially into our community."
          showContact={true}
        />

        {/* Registration Form */}
        <div className="mt-8 max-w-4xl mx-auto">
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
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      <UnsubmittedConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSubmit}
        formData={pendingData || {}}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default UnsubmittedStatus;
