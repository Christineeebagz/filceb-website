"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BUSINESS_TYPES } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { FormSection } from "./auth/FormSection";
import { FormFieldWrapper } from "./auth/FormFieldWrapper";

interface Props<T extends FieldValues> {
  schema: ZodType<T, any, any>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP" | "REGISTER";
}

const BUSINESS_TYPE_DISPLAY_NAMES: Record<string, string> = {
  CORPORATION: "Corporation",
  "SOLE PROPRIETORSHIP": "Sole Proprietorship",
  PARTNERSHIP: "Partnership",
  COOPERATIVE: "Cooperative",
  OTHERS: "Others",
};

const formSections = [
  {
    title: "Personal Information",
    fields: ["firstName", "lastName", "phone"],
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

const FIELD_DISPLAY_NAMES: Record<string, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  phone: "Phone Number",
  barangayAddress: "Barangay Address",
  province: "Province",
  city: "City",
  businessName: "Business Name",
  businesstype: "Business Type",
  idUpload: "ID Upload",
  businessDocuments: "Business Document",
};

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isRegister = type === "REGISTER";
  const isSignIn = type === "SIGN_IN";

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    setSubmitError(null);

    try {
      const result = await onSubmit(data);

      if (result.success) {
        toast.success(
          isSignIn
            ? "You have successfully signed in"
            : "You have successfully signed up"
        );
        router.push("/");
      } else {
        setSubmitError(result.error || "An error occurred");
        toast.error(result.error || "An error occurred");
      }
    } catch (error: any) {
      setSubmitError(error.message || "An unexpected error occurred");
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  const handleFileChange =
    (fieldName: Path<T>) => (filePath: string | null) => {
      if (!filePath) {
        form.setError(fieldName, {
          type: "manual",
          message: "File upload failed",
        });
      } else {
        form.clearErrors(fieldName);
        form.setValue(fieldName, filePath as any, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    };

  const shouldShowError = (field: string): boolean => {
    return Boolean(form.formState.errors[field as Path<T>]);
  };

  const getFieldPlaceholder = (field: string): string => {
    if (field === "businesstype") return "Select business type";
    if (field === "idUpload") return "Upload ID File";
    if (field === "businessDocuments") return "Upload Business Document";
    const fieldName = FIELD_NAMES[field as keyof typeof FIELD_NAMES] || field;
    return `Enter ${fieldName}`;
  };

  // ---------------- SIGN IN / SIGN UP ----------------
  if (!isRegister) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-white">
          {isSignIn ? "Welcome Back to FilCeb!" : "Create your FilCeb Account"}
        </h1>

        {submitError && (
          <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
            {submitError}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {Object.keys(defaultValues).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field: formField }) => {
                  const showError = shouldShowError(field);
                  return (
                    <FormItem>
                      <FormFieldWrapper
                        label={
                          FIELD_NAMES[field as keyof typeof FIELD_NAMES] ||
                          field
                        }
                        showError={showError}
                        errorMessage={
                          form.formState.errors[field as Path<T>]
                            ?.message as string
                        }
                      >
                        <Input
                          {...formField}
                          type={
                            FIELD_TYPES[field as keyof typeof FIELD_TYPES] ||
                            "text"
                          }
                          placeholder={getFieldPlaceholder(field)}
                          className={cn(
                            "bg-white border-gray-300 text-black",
                            showError && "border-red-500 border-2 bg-red-50"
                          )}
                        />
                      </FormFieldWrapper>
                    </FormItem>
                  );
                }}
              />
            ))}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-[#F8EF30] text-[#1E1E1E]"
            >
              {form.formState.isSubmitting
                ? "Processing..."
                : isSignIn
                  ? "Sign-in"
                  : "Sign-up"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-white/80">
          {isSignIn ? "New to FilCeb? " : "Already have an account? "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="text-[#F8EF30] font-bold hover:underline"
          >
            {isSignIn ? "Create an account" : "Sign-in"}
          </Link>
        </p>
      </div>
    );
  }

  // ---------------- REGISTER ----------------
  return (
    <div
      className="bg-[#1E1E1E] p-8 md:p-10"
      style={{ border: "2px solid #F8EF30", borderRadius: "40px" }}
    >
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Complete Your Application
      </h1>

      {submitError && (
        <div className="p-3 text-sm text-red-500 bg-red-50/10 border border-red-500/30 rounded-md mb-6">
          {submitError}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {formSections.map((section) => (
            <FormSection key={section.title} title={section.title}>
              {section.fields.map((field) => {
                if (!Object.keys(defaultValues).includes(field)) return null;

                return (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as Path<T>}
                    render={({ field: formField }) => {
                      const showError = shouldShowError(field);

                      return (
                        <FormItem>
                          <FormFieldWrapper
                            label={FIELD_DISPLAY_NAMES[field] || field}
                            showError={showError}
                            errorMessage={
                              form.formState.errors[field as Path<T>]
                                ?.message as string
                            }
                          >
                            {field === "idUpload" ||
                            field === "businessDocuments" ? (
                              <FileUpload
                                type="file"
                                accept={
                                  field === "idUpload"
                                    ? "image/*,.pdf,.doc,.docx"
                                    : ".pdf,.doc,.docx,.zip"
                                }
                                placeholder={getFieldPlaceholder(field)}
                                folder="filceb-docs"
                                variant="dark"
                                onFileChange={handleFileChange(
                                  field as Path<T>
                                )}
                                value={formField.value as string}
                                isInvalid={showError}
                              />
                            ) : field === "businesstype" ? (
                              <Select
                                onValueChange={(value) =>
                                  formField.onChange(value)
                                }
                                value={formField.value || ""}
                              >
                                <SelectTrigger
                                  className={cn(
                                    "w-full bg-white border-2 text-black",
                                    showError
                                      ? "border-red-500 bg-red-50"
                                      : "border-gray-300"
                                  )}
                                >
                                  <SelectValue
                                    placeholder={getFieldPlaceholder(field)}
                                  />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  {BUSINESS_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {BUSINESS_TYPE_DISPLAY_NAMES[type] ||
                                        type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                {...formField}
                                type={
                                  FIELD_TYPES[
                                    field as keyof typeof FIELD_TYPES
                                  ] || "text"
                                }
                                placeholder={getFieldPlaceholder(field)}
                                className={cn(
                                  "bg-white border-2 text-black",
                                  showError
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300"
                                )}
                              />
                            )}
                          </FormFieldWrapper>
                        </FormItem>
                      );
                    }}
                  />
                );
              })}
            </FormSection>
          ))}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-[#F8EF30] text-[#1E1E1E] py-6 text-lg"
          >
            {form.formState.isSubmitting
              ? "Submitting..."
              : "Submit Registration"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
