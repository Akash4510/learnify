import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { USER_ROLE } from "@prisma/client";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    // This will be triggered when an user uses google sign in
    // In that case their email is already verified
    // So we will set the emailVerified field to the time when
    // the user logged in or created an account using google
    async linkAccount({ user }) {
      // *Can use db here
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // If the user signed in using google, then no need to
      // check if email is verified
      if (account?.provider !== "credentials") return true;

      if (!user || !user.id) return true;

      // !!Cannot directly use db here
      const existingUser = await getUserById(user.id);

      // Prevent signin without email verification
      if (!existingUser?.emailVerified) return true;

      return true;
    },

    async session({ token, session }) {
      // The type of this session.user is defined in our
      // next-auth.d.ts file, in which we can add more fields
      // in the default session.user type.

      if (token.sub) {
        session.user.id = token.sub;
      }

      if (token.email) {
        session.user.email = token.email;
      }

      if (token.name) {
        session.user.name = token.name;
      }

      if (token.picture) {
        session.user.image = token.picture;
      }

      if (token.role) {
        session.user.role = token.role as USER_ROLE;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      // !!Cannot directly use db here
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // This is to update the current session
      // whenever we update a field in our account
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
