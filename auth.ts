// import NextAuth, { User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { db } from "./database/drizzle";
// import { users } from "./database/schema";
// import { eq } from "drizzle-orm";
// import { compare } from "bcryptjs";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials): Promise<any> {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         const user = await db
//           .select()
//           .from(users)
//           .where(eq(users.email, credentials.email.toString()))
//           .limit(1);

//         if (user.length === 0) return null;

//         console.log("check the current user here");
//         console.log(user[0]);

//         const isPasswordValid = await compare(
//           credentials.password.toString(),
//           user[0].password
//         );

//         if (!isPasswordValid) return null;

//         return {
//           id: user[0].id,
//           email: user[0].email ?? "",
//           name:
//             ([user[0].firstName, user[0].lastName].filter(Boolean).join(" ") ||
//               user[0].email) ??
//             "",
//           firstName: user[0].firstName ?? "",
//           lastName: user[0].lastName ?? "",
//           status: user[0].status ?? "",
//           role: user[0].role ?? "",
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.firstName = user.firstName;
//         token.lastName = user.lastName;
//         token.status = user.status;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id as string,
//           email: token.email as string,
//           name:
//             [token.firstName, token.lastName].filter(Boolean).join(" ") ||
//             token.email,
//           firstName: token.firstName as string | undefined,
//           lastName: token.lastName as string | undefined,
//           status: token.status as string | undefined,
//           role: token.role as string | undefined,
//         },
//       };
//     },
//   },
// });
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./database/drizzle";
import { users } from "./database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
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

        console.log("check the current user here");
        console.log(user[0]);

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
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.status = user.status;
        token.role = user.role;
      }

      // ALWAYS fetch fresh user data from database on every JWT callback
      // This ensures the session data is never stale
      if (token.email) {
        const freshUser = await db
          .select()
          .from(users)
          .where(eq(users.email, token.email as string))
          .limit(1);

        if (freshUser.length > 0) {
          token.firstName = freshUser[0].firstName;
          token.lastName = freshUser[0].lastName;
          token.status = freshUser[0].status;
          token.role = freshUser[0].role;
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
  },
});
