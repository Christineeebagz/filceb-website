// components/admin/users/PaymentSection.tsx
"use client";

import { InfoSection } from "./InfoSection";
import { UserWithDocuments } from "./types";

interface PaymentSectionProps {
  user: UserWithDocuments;
}

export function PaymentSection({ user }: PaymentSectionProps) {
  // Check if payment info is complete
  const hasReferenceNum = user.referenceNum && user.referenceNum !== "";
  const hasModeOfPayment = false; // You'll need to add this to your schema if needed

  const items = [
    {
      label: "Reference No",
      value: user.referenceNum,
    },
    {
      label: "Mode of Payment",
      value: null, // Add this when you have the field
    },
  ];

  return <InfoSection title="Payment Information" items={items} />;
}
