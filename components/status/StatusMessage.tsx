"use client";

import React from "react";

interface StatusMessageProps {
  title: string;
  status: string;
  statusColor?: string;
  comment: string;
  instruction: string;
  closing: string;
  actionButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  showContact?: boolean;
  icon?: React.ReactNode;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  title,
  status,
  statusColor = "#8B5CF6",
  comment,
  instruction,
  closing,
  actionButton,
  secondaryButton,
  showContact = true,
  icon,
}) => {
  return (
    <div className="flex items-start justify-center p-4 pt-8 bg-white">
      <div className="border-4 border-[#F8EF30] rounded-3xl p-12 max-w-2xl w-full bg-white">
        {/* Title - Times New Roman, 32px */}
        <h1
          className="text-[32px] font-bold text-center mb-6 text-[#1E1E1E]"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {title}
        </h1>

        {/* Status - Black, 20px, Aileron */}
        <div className="text-center mb-6">
          <span
            className="font-bold text-[20px] text-[#1E1E1E]"
            style={{ fontFamily: "var(--font-aileron)" }}
          >
            Status:{" "}
          </span>
          <span
            className="font-bold text-[20px]"
            style={{ color: statusColor, fontFamily: "var(--font-aileron)" }}
          >
            {status}
          </span>
        </div>

        {/* Comment with underline - Times New Roman */}
        <p
          className="text-center mb-6 underline text-base text-[#1E1E1E]"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {comment}
        </p>

        {/* Instruction - Times New Roman, with 24px spacing */}
        <p
          className="text-center mb-[24px] text-base text-[#1E1E1E] leading-[18px]"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {instruction}
        </p>

        {/* Closing - Aileron Black */}
        <p
          className="text-center font-black text-base text-[#1E1E1E]"
          style={{ fontFamily: "var(--font-aileron)" }}
        >
          {closing}
        </p>

        {/* Action Buttons */}
        {(actionButton || secondaryButton) && (
          <div className="space-y-3 mt-8">
            {actionButton && (
              <div className="flex justify-center">
                {actionButton.href ? (
                  <a
                    href={actionButton.href}
                    className="w-full bg-[#F8EF30] text-[#1E1E1E] font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity text-center"
                    style={{ fontFamily: "var(--font-aileron)" }}
                  >
                    {actionButton.text}
                  </a>
                ) : (
                  <button
                    onClick={actionButton.onClick}
                    className="w-full bg-[#F8EF30] text-[#1E1E1E] font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ fontFamily: "var(--font-aileron)" }}
                  >
                    {actionButton.text}
                  </button>
                )}
              </div>
            )}

            {secondaryButton && (
              <div className="flex justify-center">
                {secondaryButton.href ? (
                  <a
                    href={secondaryButton.href}
                    className="w-full bg-gray-200 text-[#1E1E1E] font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors text-center"
                    style={{ fontFamily: "var(--font-aileron)" }}
                  >
                    {secondaryButton.text}
                  </a>
                ) : (
                  <button
                    onClick={secondaryButton.onClick}
                    className="w-full bg-gray-200 text-[#1E1E1E] font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                    style={{ fontFamily: "var(--font-aileron)" }}
                  >
                    {secondaryButton.text}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
