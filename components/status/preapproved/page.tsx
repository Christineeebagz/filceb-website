// components/status/preapproved/page.tsx
"use client";

import React, { useState } from "react";
import { StatusMessage } from "../StatusMessage";

const PreApprovedStatus = () => {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto ">
        <div className="flex flex-col items-center">
          <StatusMessage
            title="Almost There!"
            status="Pre-Approved"
            statusColor="#FF751F" // Orange for pre-approved (same as pending)
            comment="We are pleased to inform you that your application has received pre-approval!"
            instruction="To push through with your membership and gain access to all club benefits, please complete your payment. Refer to the details and options below."
            closing="We're excited to welcome you officially into our community."
            actionButton={{
              text: showPayment ? "Complete Payment" : "Proceed to Payment",
              onClick: () => setShowPayment(true),
            }}
            secondaryButton={{
              text: "Learn More About Benefits",
              href: "/about",
            }}
            showContact={true}
          />

          {/* Payment Portal - shown when action button is clicked */}
          {showPayment && (
            <div className="mt-8 max-w-md w-full">
              <div className="backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-[#1E1E1E] mb-4">
                  Payment Portal
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Select Payment Method
                    </label>
                    <select className="w-full p-3 rounded-lg bg-white border border-gray-300 text-[#1E1E1E]">
                      <option value="bank">Bank Transfer</option>
                      <option value="gcash">GCash</option>
                      <option value="card">Credit/Debit Card</option>
                    </select>
                  </div>
                  <button className="w-full bg-[#F8EF30] text-[#1E1E1E] font-bold py-3 rounded-lg hover:opacity-90">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreApprovedStatus;
