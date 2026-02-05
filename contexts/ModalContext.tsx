"use client";

import React, { createContext, useContext, useState } from "react";

type AuthModalType = "SIGN_IN" | "SIGN_UP" | null;

interface ModalContextType {
  authModal: AuthModalType;
  openAuthModal: (type: AuthModalType) => void;
  closeAuthModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [authModal, setAuthModal] = useState<AuthModalType>(null);

  const openAuthModal = (type: AuthModalType) => {
    setAuthModal(type);
  };

  const closeAuthModal = () => {
    setAuthModal(null);
  };

  return (
    <ModalContext.Provider value={{ authModal, openAuthModal, closeAuthModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
