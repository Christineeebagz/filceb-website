import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold text-lg text-white">
              <div className="w-8 h-8 rounded-full bg-[#F8EF30]" />
              <span>FILCEB</span>
            </div>
            <p className="text-sm text-[#A0A0A0]">
              Philippines Business Club - Networking, Learning, Growing
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-[#F8EF30]">Quick Links</h3>
            <Link
              href="/"
              className="text-sm transition-colors hover:opacity-80 text-[#D0D0D0]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm transition-colors hover:opacity-80 text-[#D0D0D0]"
            >
              About Us
            </Link>
            <Link
              href="/community"
              className="text-sm transition-colors hover:opacity-80 text-[#D0D0D0]"
            >
              Community
            </Link>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-[#F8EF30]">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-full transition-all hover:opacity-80 bg-[#333333]"
              >
                <Facebook size={16} color="#F8EF30" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full transition-all hover:opacity-80 bg-[#333333]"
              >
                <Twitter size={16} color="#F8EF30" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full transition-all hover:opacity-80 bg-[#333333]"
              >
                <Linkedin size={16} color="#F8EF30" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full transition-all hover:opacity-80 bg-[#333333]"
              >
                <Mail size={16} color="#F8EF30" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-8 border-t border-[#333333]">
          <p className="text-sm text-center text-[#A0A0A0]">
            © {new Date().getFullYear()} FILCEB Business Club. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
