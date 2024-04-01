"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas/auth";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: RegisterSchema) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { name, email, password } = validatedFields.data;

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: {
        message: `Email ${email} already registered`,
      },
    };
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword, // Make sure to store hashed password only
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: {
      message: "Verification email sent. Please verify your email to login",
      user: newUser,
    },
  };
};
