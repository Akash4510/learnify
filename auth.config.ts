import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

import { LoginSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user";

export default {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          // User may not have password if they logged in using Google
          // So we will not allow them to login normally using id, password
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
