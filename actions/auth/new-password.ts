"use server";

import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas/auth";
import { db } from "@/lib/db";

export const setNewPassword = async (
  values: NewPasswordSchema,
  token: string | null
) => {
  if (!token) {
    return {
      error: {
        message: "Missing token!",
      },
    };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields",
      },
    };
  }

  const { password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return {
      error: {
        message: "Password do not match, please enter the password carefully",
      },
    };
  }

  const existingToken = await db.passwordResetToken.findUnique({
    where: { token },
  });

  if (!existingToken) {
    return {
      error: {
        message: "Invalid token!",
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
        message: "Email does not exists",
      },
    };
  }

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: {
      message: "Password updated",
    },
  };
};
