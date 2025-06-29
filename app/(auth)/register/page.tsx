"use client";
import AuthForm from "@/components/AuthForm";
import { registerSchema } from "@/lib/validations";
import React from "react";

const Page = () => {
  return (
    <AuthForm
      type="REGISTER"
      schema={registerSchema}
      defaultValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        barangayAddress: "",
        province: "",
        city: "",
        businessName: "",
        businessType: "",
        idUpload: null,
        businessDocuments: null,
      }}
      onSubmit={() => {}}
    />
  );
};

export default Page;
