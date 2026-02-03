import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 bg-accent rounded-full" />
              <span>FILCEB</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Philippines Business Club - Networking, Learning, Growing
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-accent">Quick Links</h3>
            <Link
              href="/"
              className="text-sm hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-accent transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/community"
              className="text-sm hover:text-accent transition-colors"
            >
              Community
            </Link>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-accent">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 hover:bg-accent/20 rounded-full transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 hover:bg-accent/20 rounded-full transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 hover:bg-accent/20 rounded-full transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 hover:bg-accent/20 rounded-full transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <p className="text-sm text-center text-primary-foreground/80">
            © {new Date().getFullYear()} FILCEB Business Club. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
