import { USER_ROLE } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  // All of these properties exists in the default session
  // but they can be undefined so I am making it mandatory here.
  id: string;
  name: string;
  email: string;
  image: string | null;

  // From here we can add our own fields which we want to add in
  // the session user.
  role: USER_ROLE;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
