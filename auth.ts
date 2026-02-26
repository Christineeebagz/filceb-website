import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./database/drizzle";
import { users } from "./database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

export const runtime = "nodejs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 🔴 ADD THESE CRITICAL CONFIGS:
  trustHost: true, // Required for local development
  basePath: "/api/auth", // Explicitly set auth path

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);

        if (user.length === 0) return null;

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password
        );

        if (!isPasswordValid) return null;

        return {
          id: user[0].id,
          email: user[0].email ?? "",
          name:
            ([user[0].firstName, user[0].lastName].filter(Boolean).join(" ") ||
              user[0].email) ??
            "",
          firstName: user[0].firstName ?? "",
          lastName: user[0].lastName ?? "",
          status: user[0].status ?? "UNSUBMITTED",
          role: user[0].role ?? "USER",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.status = user.status;
        token.role = user.role;
      }

      // Fetch fresh user data
      if (token.email) {
        const freshUser = await db
          .select()
          .from(users)
          .where(eq(users.email, token.email as string))
          .limit(1);

        if (freshUser.length > 0) {
          token.id = freshUser[0].id;
          token.firstName = freshUser[0].firstName ?? "";
          token.lastName = freshUser[0].lastName ?? "";
          token.status = freshUser[0].status ?? "UNSUBMITTED";
          token.role = freshUser[0].role ?? "USER";
        }
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: ([token.firstName, token.lastName].filter(Boolean).join(" ") ||
            token.email) as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          status: (token.status as string) || "UNSUBMITTED",
          role: (token.role as string) || "USER",
        },
      };
    },

    // 🔴 ADD THIS CALLBACK TO PREVENT REDIRECT LOOP:
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;

      // Allow public access to these paths
      const publicPaths = [
        "/",
        "/api/auth/signin",
        "/api/auth/signout",
        "/api/auth/callback",
        "/api/auth/session",
        "/api/auth/csrf",
        "/api/auth/providers",
        "/api/auth/error",
      ];

      // If accessing public path, allow
      if (publicPaths.some((path) => pathname.startsWith(path))) {
        return true;
      }

      // Otherwise, require authentication
      return !!auth?.user;
    },
  },

  // 🔴 OPTIONAL: Add pages config if using custom pages
  pages: {
    signIn: "/api/auth/signin",
    error: "/api/auth/error",
  },
});
