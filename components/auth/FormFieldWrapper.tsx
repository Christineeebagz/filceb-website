// components/auth/FormFieldWrapper.tsx
"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface FormFieldWrapperProps {
  label: string;
  showError?: boolean;
  errorMessage?: string;
  children: ReactNode;
}

export function FormFieldWrapper({
  label,
  showError,
  errorMessage,
  children,
}: FormFieldWrapperProps) {
  return (
    <div className="space-y-1">
      <label
        className={cn(
          "capitalize flex items-center gap-1 text-sm font-medium",
          showError ? "text-red-500" : "text-white/90"
        )}
      >
        {label}
      </label>
      {children}
      {showError && errorMessage && (
        <div className="flex items-center gap-1 mt-1 text-red-500">
          <AlertCircle className="h-3 w-3" />
          <p className="text-xs font-medium">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
