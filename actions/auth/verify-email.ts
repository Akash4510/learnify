"use server";

import { db } from "@/lib/db";

export const verifyEmail = async (token: string) => {
  const existingToken = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!existingToken) {
    return {
      error: {
        message: "Token does not exists",
      },
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: {
        message: "Token has expired",
      },
    };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: existingToken.email,
    },
  });

  if (!existingUser) {
    return {
      error: {
        message: "Email does not exists!",
      },
    };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
      // This will be used when user update their email
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: {
      message: "Email verified",
    },
  };
};
