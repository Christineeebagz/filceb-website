"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";
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
import { useState, useEffect } from "react";
import { BUSINESS_TYPES } from "@/lib/validations";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP" | "REGISTER";
}

// Business type display names
const BUSINESS_TYPE_DISPLAY_NAMES: Record<string, string> = {
  CORPORATION: "Corporation",
  "SOLE PROPRIETORSHIP": "Sole Proprietorship",
  PARTNERSHIP: "Partnership",
  COOPERATIVE: "Cooperative",
  OTHERS: "Others",
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

  // Fix the type issue with zodResolver
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      setSubmitError(null);
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleSubmit: SubmitHandler<T> = async (data) => {
    setSubmitError(null);
    console.log("Form submission data:", data);

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
      console.error("Form submission error:", error);
      setSubmitError(error.message || "An unexpected error occurred");
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  const handleFileChange = (fieldName: Path<T>) => (filePath: string) => {
    console.log(`File uploaded for ${fieldName}:`, filePath);
    form.setValue(fieldName, filePath as any, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        {isSignIn
          ? "Welcome Back to FilCeb!"
          : isRegister
            ? "Continue Creating your FilCeb Account"
            : "Create your FilCeb Account"}
      </h1>

      {submitError && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
          {submitError}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {field === "businesstype"
                      ? "Business Type"
                      : FIELD_NAMES[field as keyof typeof FIELD_NAMES] || field}
                  </FormLabel>
                  <FormControl>
                    {["idUpload", "businessDocuments"].includes(field) ? (
                      <FileUpload
                        type={"file"}
                        accept={
                          field === "idUpload"
                            ? "image/*,.pdf,.doc,.docx"
                            : "file/*,.pdf,.doc,.docx,.zip"
                        }
                        placeholder={`Upload your ${FIELD_NAMES[field as keyof typeof FIELD_NAMES] || field}`}
                        folder={"filceb-docs"}
                        variant={"dark"}
                        onFileChange={handleFileChange(field as Path<T>)}
                        value={formField.value as string}
                      />
                    ) : field === "businesstype" ? (
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value}
                        value={formField.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {BUSINESS_TYPES.map((businessType) => (
                            <SelectItem key={businessType} value={businessType}>
                              {BUSINESS_TYPE_DISPLAY_NAMES[businessType] ||
                                businessType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        required={
                          !["idUpload", "businessDocuments"].includes(field)
                        }
                        type={
                          FIELD_TYPES[field as keyof typeof FIELD_TYPES] ||
                          "text"
                        }
                        {...formField}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting
              ? "Processing..."
              : isSignIn
                ? "Sign-in"
                : isRegister
                  ? "Submit Registration"
                  : "Sign-up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "New to FilCeb? " : "Already have an account? "}
        <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold">
          {isSignIn ? "Create an account" : " Sign-in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
