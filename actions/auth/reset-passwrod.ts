"use server";

import { ResetPasswordSchema } from "@/schemas/auth";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const resetPassword = async (values: ResetPasswordSchema) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid email",
      },
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return {
      error: {
        message: "Account with this email doesn't exists",
      },
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success: {
      message: "Reset email sent!",
    },
  };
};
