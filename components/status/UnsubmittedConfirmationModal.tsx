// components/status/UnsubmittedConfirmationModal.tsx
"use client";

import { X, Check, AlertCircle, FileText, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FIELD_NAMES, BUSINESS_TYPES } from "@/constants";
import { useState } from "react";
import Image from "next/image";

interface UnsubmittedConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  formData: Record<string, any>;
  isSubmitting?: boolean;
}

// Business type display names (same as in AuthForm)
const BUSINESS_TYPE_DISPLAY_NAMES: Record<string, string> = {
  CORPORATION: "Corporation",
  "SOLE PROPRIORSHIP": "Sole Proprietorship",
  PARTNERSHIP: "Partnership",
  COOPERATIVE: "Cooperative",
  OTHERS: "Others",
};

// Group fields for organized display
const reviewSections = [
  {
    title: "Personal Information",
    fields: ["firstName", "lastName", "phone", "email"],
  },
  {
    title: "Location",
    fields: ["barangayAddress", "province", "city"],
  },
  {
    title: "Business Details",
    fields: ["businessName", "businesstype", "idUpload", "businessDocuments"],
  },
];

export function UnsubmittedConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  formData,
  isSubmitting = false,
}: UnsubmittedConfirmationModalProps) {
  const [imagePreview, setImagePreview] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Format value for display
  const formatValue = (field: string, value: any): string => {
    if (!value) return "Not provided";

    if (field === "businesstype") {
      return BUSINESS_TYPE_DISPLAY_NAMES[value] || value;
    }

    if (typeof value === "string") {
      return value;
    }

    return String(value);
  };

  // Check if field is a file upload
  const isFileField = (field: string): boolean => {
    return ["idUpload", "businessDocuments"].includes(field);
  };

  // Get file name from path
  const getFileName = (filePath: string): string => {
    return filePath.split("/").pop() || filePath;
  };

  // Check if all required fields are filled
  const hasMissingFields = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "barangayAddress",
      "province",
      "city",
      "businessName",
      "businesstype",
      "idUpload",
      "businessDocuments",
    ];

    return requiredFields.some((field) => !formData[field]);
  };

  const missingFieldsCount = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "barangayAddress",
      "province",
      "city",
      "businessName",
      "businesstype",
      "idUpload",
      "businessDocuments",
    ];

    return requiredFields.filter((field) => !formData[field]).length;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-[101] w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        style={{
          border: "2px solid #F8EF30",
          borderRadius: "40px",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-[#1E1E1E]">
              Review Your Application
            </h2>
            <p className="text-gray-500 mt-1">
              Please review all information before submitting
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Missing Fields Warning */}
          {hasMissingFields() && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">
                  {missingFieldsCount()} required field
                  {missingFieldsCount() > 1 ? "s" : ""} missing
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Please go back and complete all required fields before
                  submitting.
                </p>
              </div>
            </div>
          )}

          {/* Review Sections */}
          {reviewSections.map((section) => {
            // Check if section has any data
            const hasData = section.fields.some((field) => formData[field]);

            if (!hasData) return null;

            return (
              <div key={section.title} className="space-y-3">
                <h3 className="text-lg font-semibold text-[#1E1E1E] border-b border-gray-200 pb-2">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.fields.map((field) => {
                    const value = formData[field];
                    if (!value) return null;

                    return (
                      <div
                        key={field}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-500">
                            {FIELD_NAMES[field as keyof typeof FIELD_NAMES] ||
                              field}
                          </p>
                          {isFileField(field) ? (
                            <div className="flex items-center gap-2 mt-1">
                              <FileText className="h-4 w-4 text-blue-500" />
                              <span className="text-sm text-gray-900">
                                {getFileName(value)}
                              </span>
                              {value.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                                <button
                                  onClick={() => {
                                    // You could add a lightbox preview here
                                    window.open(value, "_blank");
                                  }}
                                  className="text-xs text-blue-600 hover:underline ml-2"
                                >
                                  Preview
                                </button>
                              )}
                            </div>
                          ) : (
                            <p className="text-base text-gray-900">
                              {formatValue(field, value)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* No Data State */}
          {!formData ||
            (Object.keys(formData).length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No data to review</p>
              </div>
            ))}
        </div>

        {/* Footer with Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Go Back
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              disabled={hasMissingFields() || isSubmitting}
              className={cn(
                "bg-[#F8EF30] text-[#1E1E1E] hover:bg-[#F8EF30]/90 font-semibold",
                (hasMissingFields() || isSubmitting) &&
                  "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">◌</span>
                  Submitting...
                </>
              ) : (
                "Confirm & Submit Application"
              )}
            </Button>
          </div>

          {/* Legal Disclaimer */}
          <p className="text-xs text-gray-400 text-center mt-4">
            By confirming, you certify that all information provided is accurate
            and complete. False statements may result in rejection of your
            application.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper function for conditional classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
