import { USER_ROLE } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: USER_ROLE;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
