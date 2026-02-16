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
      {/* Simple overlay without blur first */}
      <div
        className="fixed inset-0 bg-black/60"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md bg-[#1E1E1E] rounded-xl shadow-2xl"
          style={{
            border: "5px solid #F8EF30", // Yellow outline with 5px stroke
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute right-4 top-4 z-10 rounded-full p-2 hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-white/70 hover:text-white" />
          </button>

          {/* Content */}
          <div className="p-8">
            <AuthModalContent type={authModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
