"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import AuthModalContent from "./AuthModalContent";

export function AuthModal() {
  const { authModal, closeAuthModal } = useModal();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (authModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [authModal]);

  if (!authModal) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Blurred overlay with higher opacity */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-md"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-6 md:p-8">
        <div
          className="relative w-full max-w-md bg-[#1E1E1E] rounded-2xl shadow-2xl"
          style={{
            border: "2px solid #F8EF30", // Thicker yellow outline
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute right-5 top-5 z-10 rounded-full p-2.5 hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-white/80 hover:text-white" />
          </button>

          {/* Content with increased padding */}
          <div className="p-10">
            <AuthModalContent type={authModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
