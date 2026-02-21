// components/status/rejected/page.tsx
"use client";

import React from "react";
import { StatusMessage } from "../StatusMessage";

const RejectedStatus = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <StatusMessage
        title="Membership Application Reviewed"
        status="Not Accepted"
        statusColor="#FF3130" // Red for rejected
        comment="Thank you for your interest in joining our community."
        instruction="While your application was not accepted this time, we are grateful that you considered FilCeb. Our membership is curated based on various criteria to ensure a strong fit for all existing members."
        closing="We encourage you to stay connected with us through our public events and consider applying again in the future."
        actionButton={{
          text: "Contact Support",
          onClick: () => (window.location.href = "mailto:support@filceb.com"),
        }}
        secondaryButton={{
          text: "Browse Public Events",
          href: "/events",
        }}
        showContact={true}
      />
    </div>
  );
};

export default RejectedStatus;
