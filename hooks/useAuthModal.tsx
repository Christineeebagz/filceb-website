"use client";

import { useModal } from "@/contexts/ModalContext";

export function useAuthModal() {
  console.log("useAuthModal hook called");

  try {
    const { openAuthModal, closeAuthModal } = useModal();

    console.log("Successfully got modal context");

    const openSignIn = () => {
      console.log("openSignIn called");
      openAuthModal("SIGN_IN");
    };

    const openSignUp = () => {
      console.log("openSignUp called");
      openAuthModal("SIGN_UP");
    };

    return {
      openSignIn,
      openSignUp,
      closeAuthModal,
    };
  } catch (error) {
    console.error("Error in useAuthModal:", error);
    // Return fallback functions that at least log
    return {
      openSignIn: () => console.error("Modal context not available"),
      openSignUp: () => console.error("Modal context not available"),
      closeAuthModal: () => {},
    };
  }
}
