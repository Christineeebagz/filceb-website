// components/status/pending/page.tsx
"use client";

import React from "react";
import { StatusMessage } from "../StatusMessage";

const PendingStatus = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <StatusMessage
        title="Application Received"
        status="Pending"
        statusColor="#FF751F" // Orange for pending
        comment="Thank you for submitting your application and documents to the FilCeb Business Club"
        instruction="Your information is now under review. We will update your status as soon as the process is complete."
        closing="Thank you for your patience."
        showContact={true}
      />
    </div>
  );
};

export default PendingStatus;
