// types/next-auth.d.ts
import "next-auth";
import { JWT } from "next-auth/jwt";
import type { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    auth: {
      user?: {
        id: string;
        email: string;
        name?: string;
        role?: string;
        status?: string;
      };
    } | null;
  }
}
