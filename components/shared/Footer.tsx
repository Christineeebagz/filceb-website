"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Mail, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText("support@filceb.org");
      setCopied(true);
      setShowNotification(true);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);

      // Hide notification after 2 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <footer className="bg-[#2A2A2A] py-12 relative">
      {/* Copy Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#F8EF30] text-[#1E1E1E] px-5 py-3 rounded-lg shadow-xl flex items-center gap-3">
            <Check className="h-5 w-5" />
            <span className="text-sm font-medium">
              Copied Email: support@filceb.org
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Section - Logo & Info */}
          <div className="flex items-start gap-4 flex-1">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src="/logos/filceblogo.svg"
                alt="FILCEB Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="text-white">
              <h2 className="text-lg font-bold">FILCEB BUSINESS CLUB</h2>
              <p className="text-sm text-gray-400">Cebu, Philippines</p>
              <p className="text-xs text-gray-500 mt-2">
                ©2026 All Rights Reserved
              </p>
            </div>
          </div>

          {/* Right Section - Navigation & Social */}
          <div className="flex flex-col md:flex-row items-center gap-8 flex-1 justify-end">
            {/* Navigation Links */}
            <nav className="flex flex-col gap-3 text-right">
              <Link
                href="/"
                className="text-white font-semibold hover:text-[#F8EF30] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white font-semibold hover:text-[#F8EF30] transition-colors"
              >
                About Us
              </Link>
            </nav>

            {/* Social Icons */}
            <div className="flex gap-4">
              {/* Facebook Icon */}
              <a
                href="https://www.facebook.com/filceb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 border-2 border-white rounded-full flex items-center justify-center hover:border-[#F8EF30] transition-colors"
                aria-label="Facebook"
              >
                <Facebook
                  size={20}
                  className="text-white group-hover:text-[#F8EF30] transition-colors"
                />
              </a>

              {/* Email Icon with Tooltip */}
              <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button
                  onClick={handleEmailClick}
                  className="group relative w-10 h-10 border-2 border-white rounded-full flex items-center justify-center hover:border-[#F8EF30] transition-colors"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check size={20} className="text-[#F8EF30]" />
                  ) : (
                    <Mail
                      size={20}
                      className="text-white group-hover:text-[#F8EF30] transition-colors"
                    />
                  )}
                </button>

                {/* Tooltip - shows on hover */}
                {showTooltip && !copied && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-10 animate-in fade-in slide-in-from-bottom-1 duration-200">
                    support@filceb.org
                    {/* Small arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
