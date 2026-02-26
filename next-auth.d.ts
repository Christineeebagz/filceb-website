// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role?: string;
      status?: string;
    };
  }
}

// Extend the NextAuthRequest type
declare module "next/server" {
  interface NextAuthRequest {
    auth: {
      user?: {
        id: string;
        email: string;
        name?: string;
        role?: string;
        status?: string;
      };
    } | null;
    headers: Headers;
    url: string;
  }
}
